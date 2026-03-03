import { Pool } from 'pg'

// 数据库连接池配置
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tgnl_db',
  user: process.env.DB_USER || 'tgnl_user',
  password: process.env.DB_PASSWORD || 'tgnl_password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// 测试数据库连接
export async function testConnection() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('✅ 数据库连接成功:', result.rows[0].now)
    return true
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    return false
  }
}

export default pool

