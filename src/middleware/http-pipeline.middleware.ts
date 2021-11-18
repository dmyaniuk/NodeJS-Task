import bodyParser from 'body-parser';
import { Express } from 'express';

const registerHttpPipeline = (app: Express): void => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

export default registerHttpPipeline;
