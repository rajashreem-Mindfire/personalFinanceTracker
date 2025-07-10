// create healthcheck route
import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { healthCheck } from '../controllers/health.controller';
const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/', healthCheck);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', healthCheck);

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Service status endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is up
 */
router.get('/status', (req, res) => {
    res.status(httpStatus.OK).json({ status: 'UP' });
});

export default router;
