// src/main.js (项目启动文件)
import app from './app.js';
import config from './config/index.js';

app.listen(config.port, () => {
  console.log(
    `Koa server started in [${config.env}] mode, listening on port ${config.port}`
  );
});
