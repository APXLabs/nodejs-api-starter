/* global check gen:true */
const DeviceService = require('../DeviceService')
require('jasmine-check').install()
const faker = require('faker')

// This test only verify invariants, not interaction with dependencies.
// That is tested with integration tests.
describe('Device Service :: add', () => {
  describe('Add a valid device #cold-test #sanity', () => {
    let deviceService
    beforeAll(() => {
      const MockDeviceRepository = {
        add: jest.fn(data => Promise.resolve(data))
      }
      deviceService = new DeviceService({
        DeviceRepository: MockDeviceRepository
      })
    })
    test('Ensure the name of the device is resolved', async () => {
      const deviceData = { name: 'New Device', platform: 'Android' }
      await expect(deviceService.add(deviceData)).resolves.toBe('New Device')
    })
    check.it(
      'Add new device 100 times with random, UNREALISTIC and valid properties, always resolving',
      gen.string,
      gen.string,
      async (name, platform) => {
        const deviceData = { name, platform: platform }
        await expect(deviceService.add(deviceData)).resolves.toBe(name)
      }
    )
    // this will run 100 times with different Strings
    check.it(
      'Add new device 100 times with random, REALISTIC and valid properties, always resolving',
      faker.name.findName(),
      async name => {
        const deviceData = { name }
        await expect(deviceService.add(deviceData)).resolves.toBe(name)
      }
    )
  })
  describe('deviceRepository returns an error', () => {
    let deviceService
    beforeAll(() => {
      const MockDeviceRepository = {
        add: jest.fn(async data => Promise.reject(data))
      }
      deviceService = new DeviceService({
        DeviceRepository: MockDeviceRepository
      })
    })
    test('When receiving an error from repository, it should reject automatically', async () => {
      const deviceData = { name: 'New Device', platform: 'Android' }
      await expect(deviceService.add(deviceData)).rejects.toBe(deviceData)
    })
  })
})
