import { UserAddressTypeName, UserGender, UserMarriedStatus } from '../constants/userConstants';

export const validateDate = (value: unknown): boolean => value instanceof Date;

export const validateEnumValue = (
    value: unknown,
    $enum: typeof UserGender | typeof UserAddressTypeName | typeof UserMarriedStatus,
): boolean => typeof value === 'string' && $enum[value];

export const validateEmail = (value: string): boolean =>
    !!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

export const validateUkPostcode = (value: string): boolean =>
    !!value.match(/^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/);

export const validateUkNino = (value: string): boolean => !!value.match(/^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/);
