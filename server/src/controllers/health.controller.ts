// src/controllers/health.controller.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import config from '../config';

const logDir = config.ERROR_LOG_PATH || '/var/log/personalfinancetracker';

export const healthCheck = async (req: Request, res: Response) => {
    const logStatus = {
        path: logDir,
        status: 'unknown',
        error: '',
    };

    const dbStatus = {
        status: 'unknown',
        error: '',
    };

    // check if log directory exists and is writable
    try {
        // check if the log directory exists and is readable/writable
        await fs.access(logDir, fs.constants.R_OK | fs.constants.W_OK);
        logStatus.status = 'ok';
    } catch (err: any) {
        logStatus.status = 'fail';
        logStatus.error = err.message;
    }

    // check MongoDB connection
    try {

        // connect to mongodb
        await mongoose.connect(config.DB_URL);
        dbStatus.status = 'ok';
    } catch (err: any) {
        dbStatus.status = 'fail';
        dbStatus.error = err.message;
    }

    // prepare health status
    const isHealthy = logStatus.status === 'ok' && dbStatus.status === 'ok';

    return res.status(isHealthy ? 200 : 500).json({
        status: isHealthy ? 'UP' : 'DOWN',
        timestamp: new Date(),
        uptime: process.uptime(),
        mongo: dbStatus,
        logDir: logStatus,
    });
};
