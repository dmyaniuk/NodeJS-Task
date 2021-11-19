import IAppSettings from './types/settingsTypes';
import express, { Express } from 'express';
import getAppSettings from './utils/settingsUtils';
import registerHttpPipeline from './middleware/httpPipelineMiddleware';
import registerRoutes from './middleware/routersMiddleware';
import serverless from 'serverless-http';
import setupAwsConnection from './db/configuration';
import { registerExceptionMiddlewareHandler } from './middleware/exceptionMiddleware';

const app: Express = express();
const { host, port, awsRegion }: IAppSettings = getAppSettings();

registerHttpPipeline(app);
registerRoutes(app);
setupAwsConnection(awsRegion);
registerExceptionMiddlewareHandler(app);

app.listen(port, host, () => {
    console.log('Server has started!');
});

module.exports.handler = serverless(app);
