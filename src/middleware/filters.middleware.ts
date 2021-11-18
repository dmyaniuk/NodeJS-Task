import { AppException } from '../exceptions/app.exception';
import { ExceptionType } from '../constants/exceptionType';
import { Guid } from 'guid-typescript';
import { NextFunction, Request, Response } from 'express';

export const validateRouteIdParam = (req: Request, _res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;

    if (!id) {
        throw new AppException(ExceptionType.BadRequest, 'id parameter is required');
    }

    if (!Guid.isGuid(id)) {
        throw new AppException(ExceptionType.BadRequest, 'id parameter has incorrect format');
    }

    next();
};
