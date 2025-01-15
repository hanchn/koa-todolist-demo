// 以 Koa + koa-views + EJS 举例
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import path from 'path';
import Router from '@koa/router';
import { fileURLToPath } from 'url';
import errorHandler from './middlewares/errorHandler.js';
import responseFormatter from './middlewares/responseFormatter.js';
import routeMiddleware from './middlewares/routeMiddleware.js';
// 以下两行是为了获取当前文件的目录名(__dirname在ESM中不可直接用)。
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
// 错误事件监听
app.on('error', (err, ctx) => {
  console.error('Server Error:', err);
});
// 全局中间件
app.use(bodyParser());

// 配置 koa-ejs
render(app, {
  root: path.join(__dirname, '/', 'views'),
  layout: false, // 如果使用布局模板，可以设置为布局文件名
  viewExt: 'ejs',
  cache: false,
  debug: false
});

// 集成错误处理中间件
app.use(errorHandler);

// 集成响应格式化中间件（仅适用于 API 路由）
app.use(responseFormatter);

// 集成路由中间件
app.use(routeMiddleware);

app.use(async (ctx) => {
  const { request: { url } } = ctx;
  if (url === '/') {
    await ctx.render('index', { title: 'Hello Koa EJS' });
  } else { 
    ctx.body = '404';
  }
});

export default app;
