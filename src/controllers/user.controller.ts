import { Request, Response } from "express";

export const getUsers = (_req: Request, res: Response): void => {
    res.status(200).send('User');
}

export const getUserById = (_req: Request, res: Response): void => {
    res.status(200);
}

export const createUser = (_req: Request, res: Response): void => {
    res.status(200);
}

export const updateUser = (_req: Request, res: Response): void => {
    res.status(200);
}

export const removeUser = (_req: Request, res: Response): void => {
    res.status(200);
}
