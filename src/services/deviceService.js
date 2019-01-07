class DeviceService {
  constructor(deviceStore, logger) {
    this.logger = logger
    this.deviceStore = deviceStore
  }
  async create(data) {
    this.logger.info(data)
    console.log(data)
    return this.deviceStore.create(data)
  }
}

module.exports = DeviceService
