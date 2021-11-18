import { ExceptionType } from "../constants/exceptionType";

export default class SearchException extends Error {
    private readonly _errorType: ExceptionType;

    constructor(errorType: ExceptionType, message?: string) {
        super(message);

        this._errorType = errorType;
    }

    get errorType(): ExceptionType {
        return this._errorType;
    }
}
