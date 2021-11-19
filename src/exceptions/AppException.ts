import { ExceptionConstants } from '../constants/exceptionConstants';

export class AppException extends Error {
    private readonly _errorType: ExceptionConstants;

    constructor(errorType: ExceptionConstants, message?: string) {
        super(message);

        this._errorType = errorType;
        Object.setPrototypeOf(this, AppException.prototype);
    }

    get errorType(): ExceptionConstants {
        return this._errorType;
    }
}
