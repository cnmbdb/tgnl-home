import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    // 检查表是否存在
    const tables = await executeQuery("SHOW TABLES LIKE 'licenses'") as any[]
    
    if (tables.length === 0) {
      return {
        exists: false,
        message: 'licenses表不存在'
      }
    }

    // 获取表结构
    const columns = await executeQuery("DESCRIBE licenses") as any[]
    
    return {
      exists: true,
      columns: columns,
      columnNames: columns.map((col: any) => col.Field)
    }
  } catch (error: any) {
    return {
      error: true,
      message: error.message
    }
  }
})
