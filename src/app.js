// src/app.js (Koa 主程序)
import Koa from 'koa';
import config from './config/index.js';

const app = new Koa();

// 一个简单的中间件示例
app.use(async (ctx) => {
  ctx.body = `Hello, Koa! 
  ENV = ${config.env}, 
  DB_HOST = ${config.db.host}, 
  PORT = ${config.port}`;
});

export default app;
