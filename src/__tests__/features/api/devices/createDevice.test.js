const apiHelper = require('../../../apiHelper')

describe('API :: POST /api/devices', () => {
  describe('when sent data is ok', () => {
    it('creates and returns 201 and the new device', async () => {
      const { body } = await (await apiHelper())
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
