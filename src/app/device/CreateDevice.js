const Operation = require('src/app/Operation')
const Device = require('src/domain/device/Device')

class CreateDevice extends Operation {
  constructor({ devicesRepository }) {
    super()
    this.devicesRepository = devicesRepository
  }

  async execute(deviceData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs

    const device = new Device(deviceData)

    try {
      const newDevice = await this.devicesRepository.add(device)

      this.emit(SUCCESS, newDevice)
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error)
      }

      this.emit(ERROR, error)
    }
  }
}

CreateDevice.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

module.exports = CreateDevice
