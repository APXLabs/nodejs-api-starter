const { attributes } = require('structure')

const Device = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  }
})(
  class Device {
    isLegal() {
      return this.name === Device.ANDROID
    }
  }
)

Device.ANDROID = 'Android'

module.exports = Device
