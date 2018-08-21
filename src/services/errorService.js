class ErrorService {
  constructor(logger) {
    this.logger = logger
  }
  async default() {
    this.logger.error('An error was processed')
    throw new Error('Internal Server Error')
  }
}

module.exports = ErrorService
