const { createController } = require('awilix-koa')

const api = ({ DeviceService }) => ({
  createDevice: async ctx => {
    const name = await DeviceService.add(ctx.request.body)
    ctx.response.status = 201
    ctx.response.body = {
      name
    }
  }
})

module.exports = createController(api).post('/devices', 'createDevice')
