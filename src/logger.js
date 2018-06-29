import winston from 'winston';

const timestampFormat = () => new Date().toLocaleTimeString();
const prettyprintFormat = obj => JSON.stringify(obj, null, 2);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: timestampFormat,
      colorize: true,
      level: 'debug',
      prettyPrint: prettyprintFormat,
    }),
  ],
});

logger.stream = {
  /* eslint-disable no-unused-vars */
  write: (message, encoding) => {
    logger.info(message);
  },
};

export default logger;
