const Router = require('koa-router')
const bodyParser = require('koa-body-parser')
const controller = require('./utils/createControllerRoutes')

module.exports = ({ config, containerMiddleware, errorHandler, notFoundHandler }) => {
  const router = Router()
  const apiRouter = Router()

  apiRouter
    // Top middleware is the error handler.
    .use(errorHandler)
    // Parses request bodies.
    .use(bodyParser())
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(containerMiddleware)
    // Load routes (API "controllers")
    // The `controllerPath` is relative to the `interfaces/http` folder
    .use('/users', controller('user/DevicesController'))
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  router.use(apiRouter)

  return router
}
