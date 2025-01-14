// 以 Koa + koa-views + EJS 举例
import Koa from 'koa';
import views from 'koa-views';
import path from 'path';

const app = new Koa();

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

app.use(async (ctx) => {
  await ctx.render('index', { title: 'Hello Koa EJS' });
});

app.listen(3000);
