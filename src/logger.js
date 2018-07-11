import { createLogger, format, transports } from 'winston';
import env from './env';

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console({ level: env.LOG_LEVEL })],
});

export default logger;
