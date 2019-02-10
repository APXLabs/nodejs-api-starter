const controller = ({ UserService }) => ({
  createUser: async ctx => {
    const name = await UserService.add(ctx.request.body)
    ctx.response.status = 201
    ctx.response.body = {
      name
    }
  }
})
module.exports = controller
