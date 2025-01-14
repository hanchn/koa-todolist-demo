import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 以下两行是为了获取当前文件的目录名(__dirname在ESM中不可直接用)。
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. 获取当前环境，默认为 'dev'
const nodeEnv = process.env.NODE_ENV || 'dev';

// 2. 根据 nodeEnv 拼出对应的 env 文件名，如 .env.dev, .env.test 等
const envFileName = `.env.${nodeEnv}`;

// 3. 计算该文件的完整路径
const envFilePath = path.resolve(__dirname, '../', envFileName);

// 4. 加载对应的 .env
dotenv.config({ path: envFilePath });

// 5. 导出配置对象
export default {
  // 当前环境
  env: nodeEnv,

  // 从环境变量中读取端口，默认3000
  port: parseInt(process.env.PORT ?? '3000', 10),

  // 数据库相关的示例
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    pass: process.env.DB_PASS ?? '',
  },

  // 其他自定义配置
  // ...
};
