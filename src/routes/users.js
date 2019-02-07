const { makeInvoker } = require('awilix-koa')
const Router = require('koa-router')
const userAPI = require('../controllers/UserController')
const bodyParser = require('koa-bodyparser')

const router = new Router({
  prefix: '/users'
})
// Creates middleware that will invoke userAPI
const api = makeInvoker(userAPI)

router.post('/', bodyParser(), api('createUser'))

module.exports = router
