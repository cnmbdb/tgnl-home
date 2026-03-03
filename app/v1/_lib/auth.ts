import pool from '@/lib/db'

export async function validateApiUser(username?: string, password?: string): Promise<boolean> {
  if (!username || !password) return false

  try {
    const res = await pool.query(
      'SELECT id FROM api_users WHERE username = $1 AND password = $2 AND status = $3 LIMIT 1',
      [username, password, 'active']
    )
    return (res.rowCount || 0) > 0
  } catch {
    return false
  }
}

