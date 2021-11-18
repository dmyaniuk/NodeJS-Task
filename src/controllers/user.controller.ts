import { Request, Response } from "express";
import {
    getUserById as getUserByIdRepository,
    createUser as createUserRepository,
    updateUser as updateUserRepository,
    deleteUser as deleteUserRepository,
} from '../db/user.repository';
import IUser from "../types/user.types";
import { StatusCodes } from 'http-status-codes';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id as string;
    const user: IUser = await getUserByIdRepository(userId);

    res.status(StatusCodes.OK).send(user);
}


export const createUser = async (req: Request, res: Response): Promise<void> => {
    const userModel = req.body as IUser;
    await createUserRepository(userModel);

    res.sendStatus(StatusCodes.CREATED);
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userModel = req.body as IUser;
    await updateUserRepository(userModel);

    res.sendStatus(StatusCodes.OK);
}

export const removeUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id as string;
    await deleteUserRepository(userId);

    res.sendStatus(StatusCodes.NO_CONTENT);
}
