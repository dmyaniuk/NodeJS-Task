import express, { Express } from 'express';
import getAppSettings from "./utils/settings.utils";
import IAppSettings from "./types/settings.types";
import registerRoutes from "./middleware/routers.middleware";
import registerHttpPipeline from "./middleware/http-pipeline.middleware";
import setupAwsConnection from "./db/configuration.db";

const app: Express = express();
const { host, port, awsRegion }: IAppSettings = getAppSettings();

registerHttpPipeline(app);
registerRoutes(app);
setupAwsConnection(awsRegion);

app.listen(port, host, () => {
    console.log('Server has started!');
});
