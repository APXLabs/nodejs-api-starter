class Server {
  constructor({ app, database, logger }) {
    this.app = app
    this.database = database
    this.logger = logger
  }

  async start() {
    // Checking if a database was passed in
    if (this.database) {
      await this.database.connect()
    }
    await this.app.start()
  }
}

module.exports = Server
