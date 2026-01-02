import axios from 'axios';
import { loadConfig } from './config';

interface ValidationResponse {
  status: string;
  message: string;
  data?: {
    order_num: string;
    server_ip: string;
    user_id: number;
    binding_id: number;
    binding_time: string;
  };
}

class LicenseValidator {
  private static instance: LicenseValidator;
  private validationTimer: NodeJS.Timer | null = null;
  private config: any;
  private currentIP: string = '';

  private constructor() {
    this.config = loadConfig();
    this.setupValidation();
  }

  public static getInstance(): LicenseValidator {
    if (!LicenseValidator.instance) {
      LicenseValidator.instance = new LicenseValidator();
    }
    return LicenseValidator.instance;
  }

  private async getCurrentIP(): Promise<string> {
    try {
      // 尝试从系统环境变量获取IP
      if (process.env.SERVER_IP) {
        return process.env.SERVER_IP;
      }

      // 如果没有配置IP，尝试获取服务器公网IP
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('获取服务器IP失败:', error);
      throw new Error('无法获取服务器IP地址');
    }
  }

  private async validateLicense(): Promise<boolean> {
    try {
      if (!this.currentIP) {
        this.currentIP = await this.getCurrentIP();
      }

      const response = await axios.post<ValidationResponse>(
        `${this.config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`,
        {
          order_num: this.config.ORDER_NUMBER,
          server_ip: this.currentIP
        },
        {
          auth: {
            username: this.config.WORDPRESS_USERNAME,
            password: this.config.WORDPRESS_APP_PASSWORD
          }
        }
      );

      if (response.data.status === 'success') {
        console.log('许可证验证成功:', response.data.message);
        return true;
      }

      console.error('许可证验证失败:', response.data.message);
      return false;
    } catch (error: any) {
      console.error('许可证验证错误:', error.response?.data || error.message);
      return false;
    }
  }

  private async setupValidation() {
    try {
      // 初始验证
      const isValid = await this.validateLicense();
      if (!isValid) {
        console.error('初始许可证验证失败，服务将在30秒后停止...');
        setTimeout(() => {
          process.exit(1);
        }, 30000);
        return;
      }

      // 设置定期验证（每24小时）
      this.validationTimer = setInterval(async () => {
        const isStillValid = await this.validateLicense();
        if (!isStillValid) {
          console.error('许可证验证失败，服务将在30秒后停止...');
          setTimeout(() => {
            process.exit(1);
          }, 30000);
        }
      }, 24 * 60 * 60 * 1000); // 24小时
    } catch (error) {
      console.error('设置许可证验证失败:', error);
      process.exit(1);
    }
  }

  public stopValidation() {
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
      this.validationTimer = null;
    }
  }
}

export default LicenseValidator;