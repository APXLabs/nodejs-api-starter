// const bodyParser = require('koa-bodyparser')
// const { createController, makeInvoker } = require('awilix-koa')
// const Router = require('koa-router')

const controller = ({ DeviceService }) => ({
  createDevice: async ctx => {
    const name = await DeviceService.add(ctx.request.body)
    ctx.response.status = 201
    ctx.response.body = {
      name
    }
  }
})
module.exports = controller

// const router = new Router()
// const deviceAPI = makeInvoker(api)
// router.post('/devices', deviceAPI('createDevice'))

// module.exports = router

// module.exports = createController(api)
//   .prefix('/devices')
//   .post('', 'createDevice', {
//     before: [bodyParser()] // Run bodyParser just for this endpoint
//   })
