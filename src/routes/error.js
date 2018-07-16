import { createController } from 'awilix-koa';

const api = errorService => ({
  default: async ctx => ctx.ok(await errorService.default()),
});

export default createController(api)
  .prefix('/error')
  .get('', 'default');
