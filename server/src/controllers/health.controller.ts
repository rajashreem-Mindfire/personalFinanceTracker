// src/controllers/health.controller.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import config from '../config';

export class HealthController {
    constructor() {
    }

    public async healthCheck(req: Request, res: Response): Promise<Response> {
        console.log('Health check initiated'+ config.ERROR_LOG_PATH);
        const logDir = config.ERROR_LOG_PATH;
        const logStatus: any = {};
        const dbStatus: any = {};

        // check if log directory is accessible
        const logCheck = fs
            .access(logDir, fs.constants.R_OK | fs.constants.W_OK)
            .then(() => {
                logStatus.status = 'ok';
            })
            .catch((err) => {
                logStatus.status = 'fail';
                logStatus.error = err.message;
            });

        // check if database is accessible
        const dbCheck = mongoose
            .connect(config.DB_URL)
            .then(() => {
                dbStatus.status = 'ok';
            })
            .catch((err) => {
                dbStatus.status = 'fail';
                dbStatus.error = err.message;
            });

        // Wait for both checks in parallel
        await Promise.all([logCheck, dbCheck]);

        const isHealthy = logStatus.status === 'ok' && dbStatus.status === 'ok';
        return res.status(isHealthy ? 200 : 500).json({
                    status: isHealthy ? 'UP' : 'DOWN',
                    timestamp: new Date(),
                    uptime: process.uptime(),
                    mongo: dbStatus,
                    logDir: logStatus,
        });
    }
};
export default HealthController;