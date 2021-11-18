import { Express } from 'express';
import usersRouter from "../routers/users.router";

const registerRoutes = (app: Express): void => {
    app.use('/api/users', usersRouter);
}

export default registerRoutes;
