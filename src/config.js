const path = require('path')

// Resolve portable full paths for Configurator
const packageJsonPath = path.resolve(__dirname, '../package.json')
const configPath = path.resolve(__dirname, '../config.yaml')

// Initialize Configurator
const config = require('@upskill/nucleus-configurator')(
  packageJsonPath,
  configPath
)

module.exports = config
