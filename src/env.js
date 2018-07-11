import { keyblade } from 'keyblade';
import logger from './logger';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

// `keyblade` will make sure we don't rely on undefined values.
const env = keyblade(process.env, {
  message: key => `${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message),
});

export default env;
