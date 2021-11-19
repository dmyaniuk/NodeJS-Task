import AWS, { AWSError } from 'aws-sdk';
import IAppSettings from '../types/settings.types';
import IUser from '../types/user.types';
import getAppSettings from '../utils/settings.utils';
import { AppException } from '../exceptions/app.exception';
import {
    AttributeValue,
    DeleteItemInput,
    PutItemInput,
    QueryInput,
    QueryOutput,
    UpdateItemInput,
} from 'aws-sdk/clients/dynamodb';
import { ExceptionConstants } from '../constants/exception.constants';
import { Guid } from 'guid-typescript';
import { PromiseResult } from 'aws-sdk/lib/request';

const { awsTableName }: IAppSettings = getAppSettings();
const awsDocClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

export const getUserById = async (id: string): Promise<IUser> => {
    const query: QueryInput = {
        TableName: awsTableName,
        ExpressionAttributeNames: {
            '#id': 'id',
        },
        ExpressionAttributeValues: {
            ':id': id as AttributeValue,
        },
        KeyConditionExpression: '#id = :id',
    };

    const result: PromiseResult<QueryOutput, AWSError> = await awsDocClient.query(query).promise();

    if (!result.Items.length) {
        throw new AppException(ExceptionConstants.NotFound);
    }

    return result.Items[0] as unknown as IUser;
};

export const createUser = async (user: IUser): Promise<void> => {
    const newUserId: string = Guid.create().toString();

    const query: PutItemInput = {
        TableName: awsTableName,
        Item: {
            ...Object.entries(user).reduce(
                (acc: { [key: string]: unknown }, [key, value]: [key: string, value: unknown]) =>
                    value ? { ...acc, [key]: value } : acc,
                {},
            ),
            id: newUserId as AttributeValue,
        },
    };

    await awsDocClient.put(query).promise();
};

export const updateUser = async (user: IUser): Promise<void> => {
    await getUserById(user.id);

    const query: UpdateItemInput = {
        TableName: awsTableName,
        Key: {
            id: user.id as AttributeValue,
        },
        // example update params, can easily extend it
        UpdateExpression: 'set ' + 'firstName = :fN, ' + 'lastName = :ln, ' + 'middleName = :mN' + '',
        ExpressionAttributeValues: {
            ':fN': user.firstName as AttributeValue,
            ':ln': user.lastName as AttributeValue,
            ':mN': user.middleName as AttributeValue,
        },
    };

    await awsDocClient.update(query).promise();
};

export const deleteUser = async (id: string): Promise<void> => {
    const query: DeleteItemInput = {
        TableName: awsTableName,
        Key: {
            id: id as AttributeValue,
        },
    };

    await awsDocClient.delete(query).promise();
};
