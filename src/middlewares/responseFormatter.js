// middlewares/responseFormatter.js

/**
 * 响应格式化中间件，仅对 API 路由生效
 */
export default async (ctx, next) => {
  await next();

  if (
    ctx.url.startsWith('/api') &&
    ctx.status >= 200 &&
    ctx.status < 300 &&
    ctx.body !== undefined
  ) {
    ctx.body = {
      status: 'success',
      data: ctx.body,
    };
  }
};
