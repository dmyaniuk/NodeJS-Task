import { Router } from 'express';
import {
    removeUser,
    updateUser,
    createUser,
    getUserById,
} from "../controllers/user.controller";

const usersRouter = Router();

usersRouter.get('/id/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.put('/', updateUser);
usersRouter.delete('/id/:id', removeUser);

export default usersRouter;
