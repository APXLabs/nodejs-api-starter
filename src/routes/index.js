const fs = require('fs')
const path = require('path')

const loadRouters = () => {
  const indexFile = 'index.js'
  const routers = []
  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf('.') !== 0 && file !== indexFile && file.slice(-3) === '.js'
    })
    .forEach(file => {
      const router = require(path.join(__dirname, file))
      routers.push(router)
    })
  return routers
}

module.exports = loadRouters
