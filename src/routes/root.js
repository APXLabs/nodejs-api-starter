import { createController } from 'awilix-koa';

const api = rootService => ({
  default: async ctx => ctx.ok(await rootService.default()),
});

export default createController(api)
  .prefix('/')
  .get('', 'default');
