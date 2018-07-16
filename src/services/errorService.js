import logger from '../logger';

class ErrorService {
  async default() {
    logger.error('An error was processed');
    throw new Error('Internal Server Error');
  }
}

export default ErrorService;
