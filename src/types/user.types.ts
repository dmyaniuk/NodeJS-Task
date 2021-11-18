import { UserAddressTypeName, UserGender, UserMarriedStatus } from "../constants/user.constants";

export default interface IUser {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: number;
    dob: Date;
    email : string;
    gender: UserGender;
    addressLine1: string;
    addressLine2?: string;
    addressNameType: UserAddressTypeName;
    city: string;
    state?: string;
    country: string;
    postcode: string;
    maritalStatus?: UserMarriedStatus;
    nationality?: string;
    nino?: string;
    utr?: string;
}
