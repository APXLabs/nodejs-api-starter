const { createController } = require('awilix-koa')

const api = errorService => ({
  default: async ctx => ctx.ok(await errorService.default())
})

exports.default = createController(api)
  .prefix('/error')
  .get('', 'default')
