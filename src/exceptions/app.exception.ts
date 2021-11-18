import { ExceptionType } from '../constants/exceptionType';

export class AppException extends Error {
    private readonly _errorType: ExceptionType;

    constructor(errorType: ExceptionType, message?: string) {
        super(message);

        this._errorType = errorType;
        Object.setPrototypeOf(this, AppException.prototype);
    }

    get errorType(): ExceptionType {
        return this._errorType;
    }
}
