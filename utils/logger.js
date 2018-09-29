'use strict';

const winston = require('winston');

// todo: configure transports per env (console, file, syslog, cloudwatch)

module.exports = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: 'backend' }), // todo: env
        winston.format.colorize(),
        winston.format.printf(info => {
          return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        })
      )
    })
    // new winston.transports.File({ filename: 'backend.log' })
  ]
});
