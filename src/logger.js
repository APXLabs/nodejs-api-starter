import { createLogger, format, transports } from 'winston';
import env from './env';

const { combine, timestamp, printf } = format;

const myFormat = printf(info => {
  console.log(info);
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({
      level: env.LOG_LEVEL,
      handleExceptions: true,
    }),
  ],
});

export default logger;
