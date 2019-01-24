const Router = require('koa-router')
const { inject } = require('awilix-koa')

const DevicesController = {
  get router() {
    const router = new Router()

    router.use(inject('deviceSerializer'))

    router.post('/', inject('createDevice'), this.create)

    return router
  },

  async create(ctx, next) {
    const { createDevice, DeviceSerializer } = ctx.request
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createDevice.outputs

    createDevice
      .on(SUCCESS, device => {
        ctx.response.status = 200
        ctx.response.body = DeviceSerializer.serialize(device)
      })
      .on(VALIDATION_ERROR, error => {
        ctx.response.status = 400
        ctx.response.body = {
          type: 'ValidationError',
          details: error.details
        }
      })
      .on(ERROR, await next)

    createDevice.execute(ctx.request.body)
  }
}

module.exports = DevicesController
