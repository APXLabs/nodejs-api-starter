const { makeInvoker } = require('awilix-koa')
const Router = require('koa-router')
const deviceAPI = require('../controllers/deviceController')
const bodyParser = require('koa-bodyparser')

const router = new Router({
  prefix: '/devices'
})
// Creates middleware that will invoke deviceAPI
const api = makeInvoker(deviceAPI)

router.post('/', bodyParser(), api('createDevice'))

module.exports = router
