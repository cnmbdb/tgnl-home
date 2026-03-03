import { NextResponse } from 'next/server'

/**
 * CORS 响应头配置
 * 用于确保机器人系统可以跨域访问 API
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
}

/**
 * 处理 CORS 预检请求
 */
export function handleOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

/**
 * 为响应添加 CORS 头
 */
export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

/**
 * 创建带 CORS 头的 JSON 响应
 */
export function jsonWithCors(data: any, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(data, init)
  return withCors(response)
}
