export enum ExceptionConstants {
    BadRequest = 'BadRequest',
    NotFound = 'NotFound',
    InternalError = 'InternalError',
    ServiceUnavailable = 'ServiceUnavailable',
}

export const MissingRouteIdExceptionMessage = 'id parameter in route is required';
export const InvalidFormatRouteIdExceptionMessage = 'id parameter has incorrect format';

export const getMissingFieldExceptionMessage = (fieldName: string): string => `${fieldName} is required`;
export const getIncorrectValueFieldExceptionMessage = (fieldName: string): string => `${fieldName} has incorrect value`;
