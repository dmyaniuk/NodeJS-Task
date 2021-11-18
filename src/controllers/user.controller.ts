import IUser from '../types/user.types';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    createUser as createUserRepository,
    deleteUser as deleteUserRepository,
    getUserById as getUserByIdRepository,
    updateUser as updateUserRepository,
} from '../db/user-repository.db';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id as string;
    const user: IUser = await getUserByIdRepository(userId);

    res.status(StatusCodes.OK).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const userModel = req.body as IUser;
    await createUserRepository(userModel);

    res.sendStatus(StatusCodes.CREATED);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userModel = req.body as IUser;
    await updateUserRepository(userModel);

    res.sendStatus(StatusCodes.OK);
};

export const removeUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id as string;
    await deleteUserRepository(userId);

    res.sendStatus(StatusCodes.NO_CONTENT);
};
