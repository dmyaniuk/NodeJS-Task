import { Express } from 'express';
import bodyParser from 'body-parser';

const registerHttpPipeline = (app: Express): void => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}

export default registerHttpPipeline;
