import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './../config';

export default (app: any) => {

    const options = {
        swaggerDefinition: {
            info: {
                title: 'Personal Finace Tracker API Documentation',
                version: `${config.APP_VERSION}`,
            },
            tags: [
                {
                name: 'Users',
                description: 'Operations related to users',
                },
            ],
            basePath: `${config.API_PREFIX}`,
        },
        apis: ['./src/routes/**/*.ts'],
    };

    const specs = swaggerJSDoc(options);

    app.use(`${config.API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(specs, {
            explorer: true,
            swaggerOptions: {
                deepLinking: true, // keep true but avoid spaces
            },}
    ));
};
