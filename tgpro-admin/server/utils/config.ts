import { useRuntimeConfig } from '#imports'

interface Config {
  WORDPRESS_URL: string;
  WORDPRESS_USERNAME: string;
  WORDPRESS_APP_PASSWORD: string;
  ORDER_NUMBER: string;
  SERVER_IP?: string;
}

export function loadConfig(): Config {
  const config = useRuntimeConfig()
  
  const required = [
    'WORDPRESS_URL',
    'WORDPRESS_USERNAME',
    'WORDPRESS_APP_PASSWORD',
    'ORDER_NUMBER'
  ]
  
  const missing = required.filter(key => !config[key])
  
  if (missing.length > 0) {
    throw new Error(`缺少必需的配置项: ${missing.join(', ')}`)
  }
  
  return {
    WORDPRESS_URL: config.WORDPRESS_URL as string,
    WORDPRESS_USERNAME: config.WORDPRESS_USERNAME as string,
    WORDPRESS_APP_PASSWORD: config.WORDPRESS_APP_PASSWORD as string,
    ORDER_NUMBER: config.ORDER_NUMBER as string,
    SERVER_IP: config.SERVER_IP as string | undefined
  }
}