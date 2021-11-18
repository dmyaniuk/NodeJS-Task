import express, { Express } from 'express';
import { config } from 'dotenv';
import appSettings from "./utils/settings.utils";
import IAppSettings from "./types/settings.types";
import registerRoutes from "./middleware/routers.middleware";
import registerHttpPipeline from "./middleware/http-pipeline.middleware";
import setupAwsConnection from "./db/configuration.db";

config();
const app: Express = express();
const { host, port, awsRegion }: IAppSettings = appSettings;

registerHttpPipeline(app);
registerRoutes(app);
setupAwsConnection(awsRegion);

app.listen(port, host, () => {
    console.log('Server has started!');
});
