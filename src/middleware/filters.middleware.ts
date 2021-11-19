import IUser from '../types/user.types';
import { AppException } from '../exceptions/app.exception';
import { ExceptionType } from '../constants/exceptionType';
import { Guid } from 'guid-typescript';
import { NextFunction, Request, Response } from 'express';
import { UserAddressTypeName, UserGender, UserMarriedStatus } from '../constants/user.constants';
import {
    validateDate,
    validateEmail,
    validateEnumValue,
    validateUkNino,
    validateUkPostcode,
} from '../utils/validation.utils';

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

export const validateUserModelBody = (req: Request, _res: Response, next: NextFunction) => {
    const userModel: IUser = req.body;

    if (!userModel) {
        throw new AppException(ExceptionType.BadRequest, 'User model is required');
    }

    const {
        firstName,
        lastName,
        email,
        dob,
        gender,
        phone,
        addressNameType,
        maritalStatus,
        city,
        country,
        postcode,
        nino,
    } = userModel;

    validateFieldExistence('firstName', firstName);
    validateFieldExistence('lastName', lastName);
    validateFieldExistence('phone', phone);
    validateFieldExistence('city', city);
    validateFieldExistence('country', country);

    validateFieldCorrectValue('email', validateEmail(email));
    validateFieldCorrectValue('dob', validateDate(dob));
    validateFieldCorrectValue('addressNameType', validateEnumValue(addressNameType, UserAddressTypeName));
    validateFieldCorrectValue('postcode', validateUkPostcode(postcode));

    if (gender) {
        validateFieldCorrectValue('gender', validateEnumValue(gender, UserGender));
    }

    if (maritalStatus) {
        validateFieldCorrectValue('maritalStatus', validateEnumValue(maritalStatus, UserMarriedStatus));
    }

    if (nino) {
        validateFieldCorrectValue('nino', validateUkNino(nino));
    }

    next();
};

const validateFieldExistence = (fieldName: string, fieldValue: unknown): void => {
    if (!fieldValue) {
        throw new AppException(ExceptionType.BadRequest, `${fieldName} is required`);
    }
};

const validateFieldCorrectValue = (fieldName: string, value: boolean): void => {
    if (!value) {
        throw new AppException(ExceptionType.BadRequest, `${fieldName} gender has incorrect value`);
    }
};
