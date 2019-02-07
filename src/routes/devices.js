const { makeInvoker } = require('awilix-koa')
const Router = require('koa-router')
const deviceAPI = require('../controllers/deviceController')

const router = new Router({
  prefix: '/devices'
})
// Creates middleware that will invoke deviceAPI
const api = makeInvoker(deviceAPI)

router.post('/', api('createDevice'))

module.exports = router
