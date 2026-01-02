import mysql from 'mysql2/promise'

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const config = useRuntimeConfig()
    
    const connection = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      port: Number(config.dbPort),
      charset: 'utf8mb4'
    })
    
    const [results] = await connection.execute(query, params)
    await connection.end()
    return results
  } catch (error: any) {
    console.error('Database query error:', error)
    throw error
  }
}