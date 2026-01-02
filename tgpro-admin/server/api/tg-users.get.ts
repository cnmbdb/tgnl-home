import { executeQuery } from '../utils/database'
import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态
  const user = await requireAuth(event)
  if (!user) {
    return {
      success: false,
      error: '未授权访问'
    }
  }
  try {
    console.log('tg-users API called (using transactions table)')
    const query = getQuery(event)
    console.log('Query params:', query)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = query.search as string || ''
    const status = query.status as string || ''
    const membership = query.membership as string || ''
    console.log('Parsed params:', { page, limit, search, status, membership })
    
    const offset = (page - 1) * limit
    
    // 构建WHERE条件 - 基于transactions表
    let whereConditions = []
    let params: any[] = []
    
    if (search) {
      whereConditions.push('(CAST(t.chat_id AS CHAR) LIKE ?)')
      params.push(`%${search}%`)
    }
    
    // 对于status和membership，我们将基于amount来模拟状态
    if (status) {
      if (status === 'active') {
        whereConditions.push('t.amount > 0')
      } else if (status === 'inactive') {
        whereConditions.push('t.amount = 0')
      }
    }
    
    if (membership) {
      if (membership === 'vip') {
        whereConditions.push('t.amount >= 50000000') // 5000万以上为VIP
      } else if (membership === 'premium') {
        whereConditions.push('t.amount >= 100000000') // 1亿以上为Premium
      } else if (membership === 'free') {
        whereConditions.push('t.amount < 50000000') // 5000万以下为Free
      }
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''
    
    // 获取唯一用户总数
    let countQuery = `SELECT COUNT(DISTINCT chat_id) as total FROM transactions`
    let countParams: any[] = []
    
    if (whereConditions.length > 0) {
      // 重新构建WHERE条件，不使用别名
      let countWhereConditions = []
      countParams = []
      
      if (search) {
        countWhereConditions.push('(CAST(chat_id AS CHAR) LIKE ?)')
        countParams.push(`%${search}%`)
      }
      
      if (status) {
        if (status === 'active') {
          countWhereConditions.push('amount > 0')
        } else if (status === 'inactive') {
          countWhereConditions.push('amount = 0')
        }
      }
      
      if (membership) {
        if (membership === 'vip') {
          countWhereConditions.push('amount >= 50000000')
        } else if (membership === 'premium') {
          countWhereConditions.push('amount >= 100000000')
        } else if (membership === 'free') {
          countWhereConditions.push('amount < 50000000')
        }
      }
      
      if (countWhereConditions.length > 0) {
        countQuery += ` WHERE ${countWhereConditions.join(' AND ')}`
      }
    }
    
    const countResult = await executeQuery(countQuery, countParams) as any[]
    const total = countResult[0].total
    
    // 获取用户列表 - 使用简单的方法，先获取所有数据再处理
    let baseQuery = `
      SELECT 
        id,
        chat_id,
        amount,
        created_at
      FROM transactions
    `
    
    let usersParams: any[] = []
    if (whereConditions.length > 0) {
      let usersWhereConditions = []
      
      if (search) {
        usersWhereConditions.push('(CAST(chat_id AS CHAR) LIKE ?)')
        usersParams.push(`%${search}%`)
      }
      
      if (status) {
        if (status === 'active') {
          usersWhereConditions.push('amount > 0')
        } else if (status === 'inactive') {
          usersWhereConditions.push('amount = 0')
        }
      }
      
      if (membership) {
        if (membership === 'vip') {
          usersWhereConditions.push('amount >= 50000000')
        } else if (membership === 'premium') {
          usersWhereConditions.push('amount >= 100000000')
        } else if (membership === 'free') {
          usersWhereConditions.push('amount < 50000000')
        }
      }
      
      if (usersWhereConditions.length > 0) {
        baseQuery += ` WHERE ${usersWhereConditions.join(' AND ')}`
      }
    }
    
    baseQuery += ` ORDER BY created_at DESC`
    
    const allTransactions = await executeQuery(baseQuery, usersParams) as any[]
    
    // 处理数据，获取每个chat_id的最新记录
    const userMap = new Map()
    for (const transaction of allTransactions) {
      if (!userMap.has(transaction.chat_id)) {
        userMap.set(transaction.chat_id, {
          id: transaction.id,
          tg_user_id: transaction.chat_id,
          username: `User_${transaction.chat_id}`,
          first_name: `用户${String(transaction.chat_id).slice(-4)}`,
          last_name: '',
          membership_type: transaction.amount >= 100000000 ? 'premium' : 
                          transaction.amount >= 50000000 ? 'vip' : 'free',
          status: transaction.amount > 0 ? 'active' : 'inactive',
          is_premium: transaction.amount >= 100000000 ? 1 : 0,
          last_activity: transaction.created_at,
          created_at: transaction.created_at,
          updated_at: transaction.created_at,
          balance: transaction.amount
        })
      }
    }
    
    // 转换为数组并分页
    const allUsers = Array.from(userMap.values())
    const users = allUsers.slice(offset, offset + limit)
    
    // 获取统计数据 - 基于已处理的用户数据
    const totalUsers = allUsers.length
    const freeCount = allUsers.filter(u => u.membership_type === 'free').length
    const vipCount = allUsers.filter(u => u.membership_type === 'vip').length
    const premiumCount = allUsers.filter(u => u.membership_type === 'premium').length
    const activeCount = allUsers.filter(u => u.status === 'active').length
    const inactiveCount = allUsers.filter(u => u.status === 'inactive').length
    const premiumTelegramCount = allUsers.filter(u => u.is_premium === 1).length
    
    // 计算今天新增用户
    const today = new Date().toISOString().split('T')[0]
    const todayNewUsers = allUsers.filter(u => {
      const userDate = new Date(u.created_at).toISOString().split('T')[0]
      return userDate === today
    }).length
    
    const stats = [{
      total_users: totalUsers,
      free_count: freeCount,
      vip_count: vipCount,
      premium_count: premiumCount,
      active_count: activeCount,
      banned_count: 0,
      inactive_count: inactiveCount,
      premium_telegram_count: premiumTelegramCount,
      today_new_users: todayNewUsers
    }]
    
    return {
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        stats: stats[0]
      }
    }
  } catch (error: any) {
    console.error('Error fetching users from transactions:', error)
    return {
      success: false,
      error: error.message
    }
  }
})