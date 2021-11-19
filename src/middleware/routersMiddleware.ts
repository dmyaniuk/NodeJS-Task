import usersRouter from '../routers/usersRouter';
import { Express } from 'express';

const registerRoutes = (app: Express): void => {
    app.use('/api/users', usersRouter);
};

export default registerRoutes;
