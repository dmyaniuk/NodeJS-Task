import {Express, NextFunction, Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppException } from "../exceptions/app.exception";
import {ExceptionType} from "../constants/exceptionType";

const exceptionMiddlewareHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    const resBody: { message: string } = { message: 'Some internal server error occurred...' };

    if (error instanceof AppException) {
        switch (error.errorType) {
            case ExceptionType.BadRequest:
                res.status(StatusCodes.BAD_REQUEST);
                break;
            case ExceptionType.NotFound:
                res.status(StatusCodes.NOT_FOUND);
                break;
            case ExceptionType.InternalError:
                res.status(StatusCodes.INTERNAL_SERVER_ERROR);
                break;
            case ExceptionType.ServiceUnavailable:
                res.status(StatusCodes.SERVICE_UNAVAILABLE);
                break;
        }

        resBody.message = error.message;
        res.send(resBody);

        return;
    }

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).send(resBody);
}

export const registerExceptionMiddlewareHandler = (app: Express): void => {
    app.use(exceptionMiddlewareHandler);
}
