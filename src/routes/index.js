import { createController } from 'awilix-koa';

const api = defaultService => ({
  default: async ctx => ctx.ok(await defaultService.default()),
});

export default createController(api)
  .prefix('/')
  .get('', 'default');
