#!/usr/bin/env node

/**
 * 子比主题 API 集成测试脚本
 * 测试 WordPress REST API 连接和订单查询
 */

const credentials = {
  username: '123@qq.com',
  appPassword: '5HfT RWJX QOjl cYYS xc0T s6xo',
  baseUrl: 'https://hfz.pw'
}

// 创建 Basic Auth 认证头
function getAuthHeader() {
  const auth = Buffer.from(`${credentials.username}:${credentials.appPassword}`).toString('base64')
  return `Basic ${auth}`
}

// 测试 WordPress REST API 连接
async function testConnection() {
  console.log('\n=== 测试 WordPress REST API 连接 ===')
  try {
    const response = await fetch(`${credentials.baseUrl}/wp-json/`, {
      headers: {
        'Authorization': getAuthHeader()
      }
    })
    
    if (response.ok) {
      console.log('✅ WordPress REST API 连接成功')
      const data = await response.json()
      console.log(`   站点名称: ${data.name}`)
      console.log(`   站点描述: ${data.description}`)
      return true
    } else {
      console.log('❌ WordPress REST API 连接失败')
      console.log(`   状态码: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log('❌ 连接错误:', error.message)
    return false
  }
}

// 查询商城商品
async function getShopProduct(productId = '2101') {
  console.log('\n=== 查询商城商品 ===')
  try {
    const response = await fetch(`${credentials.baseUrl}/wp-json/wp/v2/posts/${productId}`, {
      headers: {
        'Authorization': getAuthHeader()
      }
    })
    
    if (response.ok) {
      const product = await response.json()
      console.log('✅ 商品信息获取成功')
      console.log(`   商品ID: ${product.id}`)
      console.log(`   商品标题: ${product.title.rendered}`)
      console.log(`   商品类型: ${product.type}`)
      console.log(`   商品链接: ${product.link}`)
      return product
    } else {
      console.log('❌ 商品信息获取失败')
      console.log(`   状态码: ${response.status}`)
      return null
    }
  } catch (error) {
    console.log('❌ 查询错误:', error.message)
    return null
  }
}

// 查询最近的文章（包括订单类型）
async function getRecentPosts(postType = 'post', perPage = 5) {
  console.log(`\n=== 查询最近的 ${postType} (前${perPage}条) ===`)
  try {
    const params = new URLSearchParams({
      post_type: postType,
      per_page: perPage.toString(),
      orderby: 'date',
      order: 'desc'
    })
    
    const response = await fetch(`${credentials.baseUrl}/wp-json/wp/v2/posts?${params}`, {
      headers: {
        'Authorization': getAuthHeader()
      }
    })
    
    if (response.ok) {
      const posts = await response.json()
      console.log(`✅ 获取成功 (共 ${posts.length} 条)`)
      posts.forEach((post, index) => {
        console.log(`\n   [${index + 1}] ID: ${post.id}`)
        console.log(`       标题: ${post.title.rendered}`)
        console.log(`       类型: ${post.type}`)
        console.log(`       状态: ${post.status}`)
        console.log(`       日期: ${post.date}`)
      })
      return posts
    } else {
      console.log('❌ 查询失败')
      console.log(`   状态码: ${response.status}`)
      const error = await response.text()
      console.log(`   错误信息: ${error}`)
      return []
    }
  } catch (error) {
    console.log('❌ 查询错误:', error.message)
    return []
  }
}

// 主测试函数
async function main() {
  console.log('=====================================')
  console.log('  子比主题 WordPress API 集成测试')
  console.log('=====================================')
  console.log(`\n站点: ${credentials.baseUrl}`)
  console.log(`用户: ${credentials.username}`)
  
  // 测试连接
  const connected = await testConnection()
  if (!connected) {
    console.log('\n⚠️  请检查网络连接或认证凭据')
    process.exit(1)
  }
  
  // 查询商品
  await getShopProduct('2101')
  
  // 查询最近的文章
  await getRecentPosts('post', 3)
  
  // 尝试查询 shop_order 类型（如果存在）
  await getRecentPosts('shop_order', 3)
  
  // 尝试查询 shop_product 类型
  await getRecentPosts('shop_product', 3)
  
  console.log('\n=====================================')
  console.log('  测试完成')
  console.log('=====================================\n')
}

// 运行测试
main().catch(console.error)
