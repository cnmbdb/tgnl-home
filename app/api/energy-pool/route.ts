import { NextResponse } from 'next/server'
import type { EnergyPool, ApiResponse } from '@/types'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, name, status, usage, total, created_at as "createdAt", updated_at as "updatedAt", provider_type as "providerType", provider_base_url as "providerBaseUrl", provider_username as "providerUsername", provider_password as "providerPassword" FROM energy_pools ORDER BY id ASC'
    )
    
    const energyPools: EnergyPool[] = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      status: row.status,
      usage: row.usage,
      total: row.total,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      providerType: row.providerType ?? undefined,
      providerBaseUrl: row.providerBaseUrl ?? undefined,
      providerUsername: row.providerUsername ?? undefined,
      providerPassword: row.providerPassword ?? undefined,
    }))

    const response: ApiResponse<EnergyPool[]> = {
      success: true,
      data: energyPools,
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error('获取能量池列表失败:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: '获取能量池列表失败',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `EP${Date.now()}`
    const name = body.name || '新能量池'
    const total = body.total || 1000

    const result = await pool.query(
      'INSERT INTO energy_pools (id, name, status, usage, total) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, status, usage, total, created_at as "createdAt", updated_at as "updatedAt", provider_type as "providerType", provider_base_url as "providerBaseUrl", provider_username as "providerUsername", provider_password as "providerPassword"',
      [id, name, 'active', 0, total]
    )

    const newPool: EnergyPool = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      status: result.rows[0].status,
      usage: result.rows[0].usage,
      total: result.rows[0].total,
      createdAt: result.rows[0].createdAt.toISOString(),
      updatedAt: result.rows[0].updatedAt.toISOString(),
      providerType: result.rows[0].providerType ?? undefined,
      providerBaseUrl: result.rows[0].providerBaseUrl ?? undefined,
      providerUsername: result.rows[0].providerUsername ?? undefined,
      providerPassword: result.rows[0].providerPassword ?? undefined,
    }

    const response: ApiResponse<EnergyPool> = {
      success: true,
      data: newPool,
      message: '能量池创建成功',
    }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('创建能量池失败:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: '创建能量池失败',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

