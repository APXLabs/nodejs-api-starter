class UserRepository {
  constructor({ UserModel }) {
    this.Device = UserModel
  }

  async add(data) {
    console.log('user stored!')
    // return this.Device.create(data)
  }
}
module.exports = UserRepository
