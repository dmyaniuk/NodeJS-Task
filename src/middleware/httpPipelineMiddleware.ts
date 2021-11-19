import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Express } from 'express';

const registerHttpPipeline = (app: Express): void => {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

export default registerHttpPipeline;
