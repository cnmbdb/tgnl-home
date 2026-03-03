// 验证码存储和验证工具

interface CaptchaData {
  answer: number
  expires: number
}

// 简单的内存存储（生产环境建议使用 Redis）
const captchaStore = new Map<string, CaptchaData>()

// 清理过期的验证码（每 5 分钟清理一次）
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of captchaStore.entries()) {
    if (value.expires < now) {
      captchaStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

// 生成验证码
export function generateCaptcha(): { captchaId: string; question: string; answer: number } {
  // 生成简单的数学题
  const num1 = Math.floor(Math.random() * 10) + 1
  const num2 = Math.floor(Math.random() * 10) + 1
  const answer = num1 + num2
  
  // 生成唯一 ID
  const captchaId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  // 存储答案，5 分钟过期
  captchaStore.set(captchaId, {
    answer,
    expires: Date.now() + 5 * 60 * 1000, // 5 分钟
  })

  // 调试信息（如不需要可以注释掉）
  console.debug?.('[captcha] generate', { captchaId, question: `${num1} + ${num2}`, answer })
  
  return {
    captchaId,
    question: `${num1} + ${num2} = ?`,
    answer,
  }
}

// 验证验证码
export function verifyCaptcha(captchaId: string, answer: number): boolean {
  const captcha = captchaStore.get(captchaId)
  
  if (!captcha) {
    console.warn?.('[captcha] verify failed: not found', { captchaId, answer })
    return false
  }
  
  // 检查是否过期
  if (captcha.expires < Date.now()) {
    captchaStore.delete(captchaId)
    console.warn?.('[captcha] verify failed: expired', { captchaId, storedAnswer: captcha.answer, answer })
    return false
  }
  
  // 验证答案
  const isValid = captcha.answer === answer
  console.debug?.('[captcha] verify', {
    captchaId,
    storedAnswer: captcha.answer,
    answer,
    isValid,
  })
  
  // 验证后删除（一次性使用）
  captchaStore.delete(captchaId)
  
  return isValid
}
