import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

function createPool() {
  if (!pool) {
    const config = useRuntimeConfig()
    
    pool = mysql.createPool({
      host: config.dbHost || 'localhost',
      user: config.dbUser || 'root',
      password: config.dbPassword || '',
      database: config.dbName || 'hftgpro',
      port: Number(config.dbPort) || 3306,
      charset: 'utf8mb4',
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
      idleTimeout: 300000,
      queueLimit: 0
    })
  }
  return pool
}

export async function executeQuery(query: string, params: any[] = []) {
  let connection = null
  try {
    const pool = createPool()
    connection = await pool.getConnection()
    
    const [results] = await connection.execute(query, params)
    return results
  } catch (error: any) {
    console.error('Database query error:', {
      error: error.message,
      code: error.code,
      errno: error.errno,
      query: query.substring(0, 100) + '...'
    })
    throw new Error(`数据库连接失败: ${error.message}`)
  } finally {
    if (connection) {
      connection.release()
    }
  }
}