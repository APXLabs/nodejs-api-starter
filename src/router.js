const compose = require('koa-compose')

const loadRouters = require('./routes')

const routers = loadRouters()

const combineRouters = () => {
  const middleware = []
  routers.forEach(router => {
    middleware.push(router.routes())
    middleware.push(
      router.allowedMethods({
        throw: true
      })
    )
  })
  return compose(middleware)
}

module.exports = combineRouters
