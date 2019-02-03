class DeviceService {
  constructor({ DeviceRepository }) {
    this.repository = DeviceRepository
  }

  async add(data) {
    // Get more data if you need it
    // Do more business logic here
    const device = await this.repository.add(data)
    const { name } = device
    return name
  }
}

module.exports = DeviceService
