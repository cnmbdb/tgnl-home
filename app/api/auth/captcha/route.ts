import { NextResponse } from 'next/server'
import { unstable_noStore as noStore } from 'next/cache'
import { generateCaptcha } from '@/lib/captcha'

// 强制动态渲染，避免 Next.js 对 GET Route 做缓存（否则验证码会一直不变）
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export async function GET() {
  try {
    // 禁用 Next 的请求级缓存
    noStore()
    const { captchaId, question } = generateCaptcha()

    const res = NextResponse.json(
      {
        success: true,
        data: {
          captchaId,
          question,
        },
      },
      {
        status: 200,
      }
    )

    // 明确禁止任何中间层缓存验证码接口，避免题目不更新
    res.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    res.headers.set('Pragma', 'no-cache')
    res.headers.set('Expires', '0')

    return res
  } catch (error) {
    console.error('生成验证码失败:', error)
    const res = NextResponse.json(
      {
        success: false,
        error: '生成验证码失败',
      },
      { status: 500 }
    )
    res.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    res.headers.set('Pragma', 'no-cache')
    res.headers.set('Expires', '0')
    return res
  }
}
