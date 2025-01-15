// middlewares/errorHandler.js

import chalk from 'chalk';

/**
 * 错误处理中间件
 */
export default async (ctx, next) => {
  try {
    await next();

    // 处理 404 未找到
    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: '页面未找到',
      };
    }
  } catch (err) {
    // 设置 HTTP 状态码
    ctx.status = err.status || 500;

    // 设置响应体
    ctx.body = {
      status: 'error',
      message: err.message || '内部服务器错误',
    };

    // 记录错误日志
    console.error(chalk.red('Error:', err));

    // 触发应用的 'error' 事件
    ctx.app.emit('error', err, ctx);
  }
};
