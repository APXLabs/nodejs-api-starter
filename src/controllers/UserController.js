// const bodyParser = require('koa-bodyparser')
// const { createController, makeInvoker } = require('awilix-koa')
// const Router = require('koa-router')

const controller = ({ UserService }) => ({
  createUser: async ctx => {
    const name = await UserService.add(ctx.request.body)
    ctx.response.status = 201
    ctx.response.body = {
      name
    }
  }
})
module.exports = controller

// const router = new Router()
// const userAPI = makeInvoker(api)
// router.post('/users', userAPI('createuser'))

// module.exports = router

// module.exports = createController(api)
//   .prefix('/users')
//   .post('', 'createuser', {
//     before: [bodyParser()] // Run bodyParser just for this endpoint
//   })
