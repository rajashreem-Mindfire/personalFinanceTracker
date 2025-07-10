import * as express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status-codes';
import compression from 'compression';

import v1Routes from '../routes/v1';
import healthRoutes from '../routes/healthcheck';
import config from '../config';
import logger from '../utils/logger';
import errorHandler from '../middlewares/errorHandler';

export default (app: express.Express) => {

    // middleware to parse the request body
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // middleware to parse cookies
    app.use(cookieParser());

    // use compression to decrease the size of the response body and hence increase the speed of a web app
    app.use(compression());

    // load API routes
    // health route (outside versioning)
    app.use(config.API_PREFIX, healthRoutes);

    // versioned API routes
    // v1 routes
    app.use(config.API_PREFIX + '/v1', v1Routes);

    // error handler
    app.use(errorHandler);

    // make port configurable
    const PORT = process.env.NODE_PORT || config.PORT;

    // global exception handler
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        logger.error(`loaders.express.globalException`, `Error: ${err.message}, Stack: ${err.stack}`);

        res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({ status: err.status, message: err.message });
    });

    // global route handler
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(httpStatus.NOT_FOUND).send({ message: `Page ${req.url} Not found.` });
    });

    // start the server
    app.listen(PORT, () => {
        app.emit('appStarted');
    }).on('error', (err) => {
        process.exit(1);
    });

    app.on('appStarted', () => {
        logger.info(`Personal finance tracker service running on port ${PORT}`);
    });

    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        logger.warn('loaders.express.uncaughtException', `${err.message}`);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.warn('Unhandled Rejection at:', promise, 'reason:', reason);
    });
};
