const apiHelper = require('../../../apiHelper')
const request = require('supertest')

describe('API :: POST /api/users', () => {
  describe('when sent data is ok', async () => {
    let app
    beforeAll(async () => {
      app = await apiHelper()
    })
    afterAll(() => {
      apiHelper.close()
    })
    it('creates and returns 201 and the new user', async () => {
      const { body } = await request(app)
        .post('/users')
        .send({
          name: 'Brian'
        })
        .expect(201)

      expect(body.name).toEqual('Brian')
      expect(body).toHaveProperty(['name'])
    })
  })
})
