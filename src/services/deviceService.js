const { BadRequest } = require('fejl')

class DeviceService {
  constructor(deviceStore, logger) {
    // this.logger = logger
    this.deviceStore = deviceStore
  }
  async createDevice(data) {
    BadRequest.assert(data, 'No device payload given')
    return this.deviceStore.create(data)
  }
}

module.exports = DeviceService
