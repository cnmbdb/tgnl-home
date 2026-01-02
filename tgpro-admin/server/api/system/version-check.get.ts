export default defineEventHandler(async (event) => {
  try {
    // 检查是否为测试模式
    const query = getQuery(event)
    const testMode = query.test === 'true'
    
    // GitHub仓库信息
    const GITHUB_REPO = 'cnmbdb/hf-tgpro-admin'
    
    // 当前系统版本（从package.json读取）
    let currentVersion = '1.0.0'
    
    try {
      const fs = await import('fs')
      const path = await import('path')
      const packageJsonPath = path.default.resolve(process.cwd(), 'package.json')
      const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(packageJsonContent)
      currentVersion = packageJson.version || '1.0.0'
    } catch (error) {
      console.warn('无法读取package.json，使用默认版本号:', error instanceof Error ? error.message : String(error))
    }
    
    // 如果是测试模式，返回模拟数据
    if (testMode) {
      const hasUpdate = true
      const updateInfo = {
        version: '1.1.0',
        description: '测试更新版本',
        downloadUrl: 'https://example.com/update.zip',
        size: 1024000,
        publishedAt: new Date().toISOString()
      }
      
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion: '1.1.0',
          hasUpdate,
          updateInfo,
          lastChecked: new Date().toISOString()
        }
      }
    }
    
    // 实际的GitHub版本检查 - 直接获取最新release
    try {
      console.log('正在检查GitHub最新版本...')
      const latestUrl = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
      const response = await fetch(latestUrl, {
        headers: {
          'User-Agent': 'TGPro-Admin-Update-Checker',
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`GitHub API请求失败: ${response.status} ${response.statusText}`)
      }
      
      const latestRelease = await response.json()
      console.log('GitHub API响应:', {
        tag_name: latestRelease.tag_name,
        name: latestRelease.name,
        published_at: latestRelease.published_at
      })
      
      // 直接使用完整的版本名称，不进行提取
      const latestVersion = latestRelease.name || latestRelease.tag_name || '1.0.0'
      console.log('Latest version name:', latestVersion)
      
      const hasUpdate = compareVersions(extractVersionNumber(latestVersion), currentVersion) > 0
      console.log('版本比较结果:', { hasUpdate, comparison: compareVersions(latestVersion, currentVersion) })
      
      // 获取资源信息 - 查找zip文件
      let downloadUrl = latestRelease.zipball_url
      let fileSize = 0
      
      if (latestRelease.assets && latestRelease.assets.length > 0) {
         // 查找zip文件
         const zipAsset = latestRelease.assets.find((asset: any) => 
           asset.name.endsWith('.zip') && asset.name.includes('tgpro-admin')
         )
         if (zipAsset) {
           downloadUrl = zipAsset.browser_download_url
           fileSize = zipAsset.size
         }
       }
      
      const updateInfo = hasUpdate ? {
        version: latestVersion,
        description: latestRelease.body || '新版本可用',
        downloadUrl: downloadUrl,
        size: fileSize,
        publishedAt: latestRelease.published_at
      } : null
      
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion,
          hasUpdate,
          updateInfo,
          lastChecked: new Date().toISOString()
        }
      }
    } catch (fetchError) {
      console.error('GitHub版本检查失败:', fetchError)
      // 如果GitHub检查失败，返回无更新状态而不是错误
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion: currentVersion,
          hasUpdate: false,
          updateInfo: null,
          lastChecked: new Date().toISOString(),
          error: '无法连接到GitHub检查更新: ' + (fetchError instanceof Error ? fetchError.message : String(fetchError))
        }
      }
    }
  } catch (error) {
    console.error('版本检查失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '版本检查失败'
    }
  }
})

function extractVersionNumber(versionString: string): string {
  // 移除常见前缀并提取版本号
  let cleanVersion = versionString
    .replace(/^tgpro-admin-v/, '')  // 移除 tgpro-admin-v 前缀
    .replace(/^v/, '')              // 移除 v 前缀
  
  // 匹配标准版本号格式 x.y.z
  const match = cleanVersion.match(/(\d+\.\d+\.\d+)/)
  if (match) {
    return match[1]
  }
  
  // 如果没有匹配到标准格式，尝试提取数字和点
  const simpleMatch = cleanVersion.match(/(\d+(?:\.\d+)*)/);
  if (simpleMatch) {
    return simpleMatch[1]
  }
  
  // 如果都没有匹配到，返回原字符串
  return cleanVersion || '1.0.0'
}

function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number)
  const v2Parts = version2.split('.').map(Number)
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0
    const v2Part = v2Parts[i] || 0
    
    if (v1Part > v2Part) return 1
    if (v1Part < v2Part) return -1
  }
  
  return 0
}