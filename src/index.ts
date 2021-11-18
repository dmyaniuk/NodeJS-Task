import IAppSettings from './types/settings.types';
import express, { Express } from 'express';
import getAppSettings from './utils/settings.utils';
import registerHttpPipeline from './middleware/http-pipeline.middleware';
import registerRoutes from './middleware/routers.middleware';
import setupAwsConnection from './db/configuration.db';
import { registerExceptionMiddlewareHandler } from './middleware/exception.middleware';

const app: Express = express();
const { host, port, awsRegion }: IAppSettings = getAppSettings();

registerHttpPipeline(app);
registerRoutes(app);
setupAwsConnection(awsRegion);
registerExceptionMiddlewareHandler(app);

app.listen(port, host, () => {
    console.log('Server has started!');
});
