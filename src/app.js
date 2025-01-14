// 以 Koa + koa-views + EJS 举例
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import path from 'path';
import { fileURLToPath } from 'url';
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

app.use(async (ctx) => {
  const { request: { url } } = ctx;
  if (url === '/') {
    await ctx.render('index', { title: 'Hello Koa EJS' });
  } else { 
    ctx.body = '404';
  }
});

export default app;
