import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/db'

export async function GET() {
  const dbConnected = await testConnection()
  
  return NextResponse.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
}

