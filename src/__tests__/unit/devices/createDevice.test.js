const DeviceService = require('src/services/DeviceService')

// This test only verify invariants, not interaction with dependencies.
// That is tested with integration tests.
describe('Device Service :: add', () => {
  describe('Add a valid device #cold-test #sanity', () => {
    let deviceService
    beforeAll(() => {
      const MockDeviceRepository = {
        add: jest.fn(async data => {
          return data
        })
      }
      deviceService = new DeviceService({
        DeviceRepository: MockDeviceRepository
      })
    })
    test('When adding a valid device, ensure the name of the device is returned', async () => {
      const deviceData = { name: 'New Device' }
      const device = await deviceService.add(deviceData)
      expect(device.name).toEqual('New Device')
    })
  })
})

// function setup() {
//   const todos = [
//     { id: '1', title: 'Todo 1', completed: true },
//     { id: '2', title: 'Todo 2', completed: false }
//   ]
//   // Mock store
//   const store = {
//     find: jest.fn(async () => [...todos]),
//     get: jest.fn(async id => todos.find(x => x.id === id)),
//     create: jest.fn(async data => ({ ...data })),
//     update: jest.fn(async (id, data) => ({ ...data })),
//     remove: jest.fn(async id => undefined)
//   }
//   return { service: new TodoService(store), store, todos }
// }
