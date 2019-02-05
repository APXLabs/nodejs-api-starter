class DeviceService {
  constructor({ DeviceRepository }) {
    this.repository = DeviceRepository
  }
  /**
   * Service function that adds device to our application.
   * @param {Object} deviceData device data to be added
   * @returns {String} The name of the device added
   */
  async add(deviceData) {
    const device = await this.repository.add(deviceData)
    const { name } = device
    return name
  }
}

module.exports = DeviceService
