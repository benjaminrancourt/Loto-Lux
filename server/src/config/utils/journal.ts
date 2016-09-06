import winston = require('winston');
import fs = require('fs');

export class Journal extends winston.Logger {
  silly: winston.LeveledLogMethod;
  REPERTOIRE: string = './logs';

  constructor() {
    super({
      transports: [
      new winston.transports.File({
        level: 'info',
        filename: './logs/info.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
      }),
      new winston.transports.Console({
        level: 'silly',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ]
    });

    if (!fs.existsSync(this.REPERTOIRE)) {
      fs.mkdirSync(this.REPERTOIRE);
    }
  }
}
