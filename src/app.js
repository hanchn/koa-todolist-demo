// 以 Koa + koa-views + EJS 举例
import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import { fileURLToPath } from 'url';
// 以下两行是为了获取当前文件的目录名(__dirname在ESM中不可直接用)。
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

app.use(async (ctx) => {
  await ctx.render('index', { title: 'Hello Koa EJS' });
});

export default app;
