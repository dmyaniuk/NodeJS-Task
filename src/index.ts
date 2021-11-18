import express, { Express } from 'express';
import { config } from 'dotenv';
import { getAppSettings } from "./utils/settings.utils";
import IAppSettings from "./types/settings.types";
import usersRouter from "./routers/users.router";

config();
const app: Express = express();
const { host, port }: IAppSettings = getAppSettings();

app.use('/users', usersRouter);

app.listen(port, host, () => {
    console.log('Server has started!');
});
