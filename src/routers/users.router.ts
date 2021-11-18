import { Router } from 'express';
import { createUser, getUserById, getUsers, removeUser, updateUser } from "../controllers/user.controller";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.put('/', updateUser);
usersRouter.delete('/:id', removeUser);

export default usersRouter;
