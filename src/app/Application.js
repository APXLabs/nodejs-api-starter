class Application {
  constructor({ server, database, logger }) {
    this.server = server
    this.database = database
    this.logger = logger
  }

  async start() {
    // Checking if a database was passed in
    if (this.database) {
      await this.database.connect()
    }

    await this.server.start()
  }
}

module.exports = Application
