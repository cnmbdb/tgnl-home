import LicenseValidator from '~/server/utils/license-validator'

export default defineNitroPlugin((nitroApp) => {
  // 暂时禁用许可证验证用于测试
  // 初始化许可证验证
  // LicenseValidator.getInstance()

  // 在应用关闭时清理
  nitroApp.hooks.hook('close', () => {
    // const validator = LicenseValidator.getInstance()
    // validator.stopValidation()
  })
})