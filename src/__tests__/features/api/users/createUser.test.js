const apiHelper = require('../../../apiHelper')

describe('API :: POST /api/users', () => {
  describe('when sent data is ok', () => {
    it('creates and returns 201 and the new user', async () => {
      const { body } = await (await apiHelper())
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
