const { createController } = require('awilix-koa')

const api = deviceService => ({
  createTodo: async ctx => ctx.ok(await deviceService.create(ctx.request.body))
})

exports.default = createController(api)
  .prefix('/device')
  .post('', 'createDevice')
