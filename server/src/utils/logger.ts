
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import config from '../config';

// set the log directory, defaulting to a logs folder in the project root
const logDir = config.ERROR_LOG_PATH || path.join(__dirname, '../../logs');


const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "personalFinanceTrackerService" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'),
      level: 'error',}),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;