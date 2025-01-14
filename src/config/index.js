#!/usr/bin/env node
import inquirer from 'inquirer';
import { spawn } from 'child_process';

(async () => {
  // 1. 询问用户选择环境
  const { env } = await inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      message: '请选择要启动的环境 (按↑↓选择, 回车确认):',
      choices: [
        { name: '开发环境 (dev)', value: 'dev' },
        { name: '测试环境 (test)', value: 'test' },
        { name: '预生产环境 (pre)', value: 'pre' },
        { name: '生产环境 (prod)', value: 'prod' }
      ],
      default: 'dev'
    }
  ]);

  console.log(`你选择了环境: ${env}`);

  // 2. 使用 cross-env 注入 NODE_ENV，再调用 nodemon
  //   - nodemon 会自动加载 nodemon.json 配置
  //   - 这样就能在文件变动时自动重启，并带上对应环境变量
  const child = spawn(
    'npx', 
    [
      'cross-env',
      `NODE_ENV=${env}`,
      'nodemon'         // 不加额外参数时, nodemon 会读取 nodemon.json 的exec
    ], 
    { stdio: 'inherit' }
  );

  // 3. 当子进程( nodemon )结束时，让当前脚本也退出
  child.on('close', (code) => {
    process.exit(code);
  });
})();
