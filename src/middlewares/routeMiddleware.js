// middlewares/routeMiddleware.js

import initializeRoutes from '../routes/index.js';

/**
 * 路由中间件
 * 负责初始化和合并所有路由
 */
const routeMiddleware = async (ctx, next) => {
  const router = initializeRoutes();

  // 挂载路由中间件
  await router.routes()(ctx, async () => {
    await router.allowedMethods()(ctx, next);
  });
};

export default routeMiddleware;
