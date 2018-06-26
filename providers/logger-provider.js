const winston = require('winston');

const defaultConfiguration = {
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      humanReadableUnhandledException: true,
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({
      humanReadableUnhandledException: true,
    }),
  ],
};

const loggerProvider = ({ config }) => new (winston.Logger)(config.get('logger') || defaultConfiguration);

module.exports = loggerProvider;
