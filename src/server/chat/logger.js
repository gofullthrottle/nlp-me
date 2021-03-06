import winston from 'winston';
import fs from 'fs';
require('winston-daily-rotate-file');
const tsFormat = () => (new Date()).toLocaleTimeString();
const env = process.env.NODE_ENV || 'dev';
let logDir = 'logs/' + env;

if (env === 'prod'){
    logDir = `/home/${process.env.USER}/nlp-me/` + logDir;
}

if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir);
}

let infoFileLog = new winston.transports.DailyRotateFile({
  name: 'infoFile',
  level: 'info',
  filename: logDir + '/info.log',
  timestamp: tsFormat,
  json: true,
  prettyPrint: true
});

let errorFileLog = new winston.transports.DailyRotateFile({
  name: 'errorFile',
  level: 'error',
  filename: logDir + '/errors.log',
  timestamp: tsFormat,
  json: true,
  prettyPrint: true
});


const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: tsFormat,
      silent: env !== 'dev'
    }),
    infoFileLog,
    errorFileLog
  ]
});

export default logger
