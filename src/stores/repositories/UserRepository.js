class UserRepository {
  constructor({ UserModel }) {
    this.User = UserModel
  }

  async add(data) {
    const newDevice = new this.User(data)
    return newDevice.save()
  }
}
module.exports = UserRepository
