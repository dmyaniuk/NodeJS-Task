import { Router } from 'express';
import { createUser, getUserById, removeUser, updateUser } from '../controllers/user.controller';
import { validateRouteIdParam } from '../middleware/filters.middleware';

const usersRouter = Router();

usersRouter.get('/id/:id', validateRouteIdParam, getUserById);
usersRouter.post('/', createUser);
usersRouter.put('/', updateUser);
usersRouter.delete('/id/:id', validateRouteIdParam, removeUser);

export default usersRouter;
