export default defineEventHandler(async (event) => {
  try {
    // 模拟用户数据 - 实际项目中应该从数据库获取
    const users = [
      {
        id: 1,
        username: '@user123',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
        membership: 'VIP会员',
        status: 'active',
        createdAt: '2024-01-15',
        lastActive: '2024-01-20'
      },
      {
        id: 2,
        username: '@testuser',
        avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
        membership: '普通会员',
        status: 'active',
        createdAt: '2024-01-10',
        lastActive: '2024-01-19'
      },
      {
        id: 3,
        username: '@newbie',
        avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
        membership: '免费用户',
        status: 'inactive',
        createdAt: '2024-01-18',
        lastActive: '2024-01-18'
      }
    ]

    return {
      success: true,
      data: users,
      total: users.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '获取用户列表失败'
    })
  }
})