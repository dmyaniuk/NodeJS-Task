import IUser from '../src/types/userTypes';
import { AppException } from '../src/exceptions/app.Exception';
import {
    ExceptionConstants,
    InvalidFormatRouteIdExceptionMessage,
    MissingRouteIdExceptionMessage,
    getIncorrectValueFieldExceptionMessage,
    getMissingFieldExceptionMessage,
} from '../src/constants/exceptionConstants';
import { Guid } from 'guid-typescript';
import { NextFunction, Request, Response } from 'express';
import { UserAddressTypeName, UserGender, UserMarriedStatus } from '../src/constants/userConstants';
import { validateRouteIdParam, validateUserModelBody } from '../src/middleware/filtersMiddleware';

describe('Filters middleware tests', () => {
    describe('Route filter tests', () => {
        test('Should validate successfully valid route params', () => {
            //Arrange
            const req: Partial<Request> = {
                params: {
                    id: Guid.EMPTY,
                },
            };
            const res: Partial<Response> = {};
            const next: NextFunction = () => {
                console.log('next');
            };

            //Act
            validateRouteIdParam(req as Request, res as Response, next);

            //Act & Assert
            expect(() => validateRouteIdParam(req as Request, res as Response, next)).not.toThrowError();
        });

        test('Should throw error on missing route param', () => {
            //Arrange
            const req: Partial<Request> = {
                params: {},
            };
            const res: Partial<Response> = {};
            const next: NextFunction = () => {
                console.log('next');
            };

            //Act & Assert
            try {
                validateRouteIdParam(req as Request, res as Response, next);
            } catch (error) {
                expect(error).toBeInstanceOf(AppException);

                const appError = error as AppException;

                expect(appError.errorType).toEqual(ExceptionConstants.BadRequest);
                expect(appError.message).toEqual(MissingRouteIdExceptionMessage);
            }
        });

        test.each([{ id: 'test' }, { id: `${Guid.EMPTY}a` }])(
            'Should throw error on invalid format of route param',
            ({ id }) => {
                //Arrange
                const req: Partial<Request> = {
                    params: {
                        id,
                    },
                };
                const res: Partial<Response> = {};
                const next: NextFunction = () => {
                    console.log('next');
                };

                //Act & Assert
                try {
                    validateRouteIdParam(req as Request, res as Response, next);
                } catch (error) {
                    expect(error).toBeInstanceOf(AppException);

                    const appError = error as AppException;

                    expect(appError.errorType).toEqual(ExceptionConstants.BadRequest);
                    expect(appError.message).toEqual(InvalidFormatRouteIdExceptionMessage);
                }
            },
        );
    });

    describe('User model filter tests', () => {
        test('Should validate successfully valid user model in req body', () => {
            //Arrange
            const user: IUser = {
                addressLine1: 'st. Sverdlova 19',
                addressNameType: UserAddressTypeName.Home,
                city: 'Minsk',
                country: 'Belarus',
                dob: new Date(2000, 10, 10),
                email: 'test@gmail.com',
                firstName: 'Dmitry',
                gender: UserGender.Skip,
                lastName: 'Yaniuk',
                phone: 12345,
                postcode: 'SW1W 0NY',
            };

            const req: Partial<Request> = {
                body: user,
            };
            const res: Partial<Response> = {};
            const next: NextFunction = () => {
                console.log('next');
            };

            //Act & Assert
            expect(() => validateUserModelBody(req as Request, res as Response, next)).not.toThrowError();
        });

        test.each([
            {
                fieldName: 'addressLine1',
                addressLine1: '',
                firstName: 'firstName',
                lastName: 'lastName',
                phone: 12345,
                city: 'city',
                country: 'country',
            },
            {
                fieldName: 'firstName',
                addressLine1: 'addressLine1',
                firstName: '',
                lastName: 'lastName',
                phone: 12345,
                city: 'city',
                country: 'country',
            },
            {
                fieldName: 'lastName',
                addressLine1: 'addressLine1',
                firstName: 'firstName',
                lastName: '',
                phone: 12345,
                city: 'city',
                country: 'country',
            },
            {
                fieldName: 'phone',
                addressLine1: 'addressLine1',
                firstName: 'firstName',
                lastName: 'lastName',
                phone: 0,
                city: 'city',
                country: 'country',
            },
            {
                fieldName: 'phone',
                addressLine1: 'addressLine1',
                firstName: 'firstName',
                lastName: 'lastName',
                phone: 0,
                city: 'city',
                country: 'country',
            },
            {
                fieldName: 'city',
                addressLine1: 'addressLine1',
                firstName: 'firstName',
                lastName: 'lastName',
                phone: 12345,
                city: '',
                country: 'country',
            },
            {
                fieldName: 'country',
                addressLine1: 'addressLine1',
                firstName: 'firstName',
                lastName: 'lastName',
                phone: 12345,
                city: 'city',
                country: '',
            },
        ])(
            'Should throw error for one of missing fields in user model field in req body',
            ({ fieldName, addressLine1, lastName, phone, city, country }) => {
                //Arrange
                const user: IUser = {
                    addressLine1,
                    addressNameType: UserAddressTypeName.Home,
                    city,
                    country,
                    dob: new Date(2000, 10, 10),
                    email: 'test@gmail.com',
                    firstName: 'Dmitry',
                    gender: UserGender.Skip,
                    lastName,
                    phone,
                    postcode: 'SW1W 0NY',
                };

                const req: Partial<Request> = {
                    body: user,
                };
                const res: Partial<Response> = {};
                const next: NextFunction = () => {
                    console.log('next');
                };

                //Act & Assert
                try {
                    validateUserModelBody(req as Request, res as Response, next);
                } catch (error) {
                    expect(error).toBeInstanceOf(AppException);

                    const appError = error as AppException;

                    expect(appError.errorType).toEqual(ExceptionConstants.BadRequest);
                    expect(appError.message).toEqual(getMissingFieldExceptionMessage(fieldName));
                }
            },
        );

        test.each([
            {
                fieldName: 'email',
                email: 'test',
                dob: new Date(2000, 10, 10),
                addressNameType: UserAddressTypeName.Home,
                postcode: 'SW1W 0NY',
            },
            {
                fieldName: 'dob',
                email: 'test@gmail.com',
                dob: 'test',
                addressNameType: UserAddressTypeName.Home,
                postcode: 'SW1W 0NY',
            },
            {
                fieldName: 'addressNameType',
                email: 'test@gmail.com',
                dob: new Date(2000, 10, 10),
                addressNameType: 'test',
                postcode: 'SW1W 0NY',
            },
            {
                fieldName: 'addressNameType',
                email: 'test@gmail.com',
                dob: new Date(2000, 10, 10),
                addressNameType: UserAddressTypeName.Home,
                postcode: 'test',
            },
        ])(
            'Should throw error for one of invalid fields in user model field in req body',
            ({ fieldName, email, dob, addressNameType }) => {
                //Arrange
                const user: IUser = {
                    addressLine1: 'st. Sverdlova 19',
                    addressNameType: addressNameType as UserAddressTypeName,
                    city: 'Minsk',
                    country: 'Belarus',
                    dob: dob as Date,
                    email,
                    firstName: 'Dmitry',
                    gender: UserGender.Skip,
                    lastName: 'Yaniuk',
                    phone: 12345,
                    postcode: 'SW1W 0NY',
                };

                const req: Partial<Request> = {
                    body: user,
                };
                const res: Partial<Response> = {};
                const next: NextFunction = () => {
                    console.log('next');
                };

                //Act & Assert
                try {
                    validateUserModelBody(req as Request, res as Response, next);
                } catch (error) {
                    expect(error).toBeInstanceOf(AppException);

                    const appError = error as AppException;

                    expect(appError.errorType).toEqual(ExceptionConstants.BadRequest);
                    expect(appError.message).toEqual(getIncorrectValueFieldExceptionMessage(fieldName));
                }
            },
        );

        test.each([
            { fieldName: 'gender', gender: '', maritalStatus: UserMarriedStatus.Married, nino: '' },
            { fieldName: 'maritalStatus', gender: UserGender.Skip, maritalStatus: 'test', nino: '' },
            { fieldName: 'nino', gender: UserGender.Skip, maritalStatus: UserMarriedStatus.Married, nino: 'test' },
        ])(
            'Should throw error for one of invalid optional fields in user model field in req body',
            ({ fieldName, gender, maritalStatus, nino }) => {
                //Arrange
                const user: IUser = {
                    addressLine1: 'st. Sverdlova 19',
                    addressNameType: UserAddressTypeName.Home,
                    city: 'Minsk',
                    country: 'Belarus',
                    dob: new Date(2000, 10, 10),
                    email: 'test@gmail.com',
                    firstName: 'Dmitry',
                    gender: gender as UserGender,
                    lastName: 'Yaniuk',
                    phone: 12345,
                    postcode: 'SW1W 0NY',
                    maritalStatus: maritalStatus as UserMarriedStatus,
                    nino,
                };

                const req: Partial<Request> = {
                    body: user,
                };
                const res: Partial<Response> = {};
                const next: NextFunction = () => {
                    console.log('next');
                };

                //Act & Assert
                try {
                    validateUserModelBody(req as Request, res as Response, next);
                } catch (error) {
                    expect(error).toBeInstanceOf(AppException);

                    const appError = error as AppException;

                    expect(appError.errorType).toEqual(ExceptionConstants.BadRequest);
                    expect(appError.message).toEqual(getIncorrectValueFieldExceptionMessage(fieldName));
                }
            },
        );
    });
});
