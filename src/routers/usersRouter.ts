import { Router } from 'express';
import { createUser, getUserById, removeUser, updateUser } from '../controllers/userController';
import { validateRouteIdParam, validateUserModelBody } from '../middleware/filtersMiddleware';

const usersRouter = Router();

usersRouter.get('/id/:id', validateRouteIdParam, getUserById);
usersRouter.post('/', validateUserModelBody, createUser);
usersRouter.put('/', validateUserModelBody, updateUser);
usersRouter.delete('/id/:id', validateRouteIdParam, removeUser);

export default usersRouter;
