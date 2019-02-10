const apiHelper = require('../../../apiHelper')
const request = require('supertest')

describe('API :: POST /api/devices', () => {
  describe('when sent data is ok', () => {
    let app
    beforeAll(async () => {
      app = await apiHelper()
    })
    afterAll(() => {
      app.close()
    })
    it('creates and returns 201 and the new device', async () => {
      const { body } = await request(app)
        .post('/devices')
        .send({
          name: 'iPhone'
        })
        .expect(201)

      expect(body.name).toEqual('iPhone')
      expect(body).toHaveProperty(['name'])
    })
  })
})
