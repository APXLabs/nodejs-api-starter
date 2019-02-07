class userService {
  constructor({ UserRepository }) {
    this.repository = UserRepository
  }
  /**
   * Service function that adds user to our application.
   * @param {Object} userData user data to be added
   * @returns {String} The name of the user added
   */
  async add(userData) {
    const user = await this.repository.add(userData)
    const { name } = user
    return name
  }
}

module.exports = userService
