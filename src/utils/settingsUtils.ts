import IAppSettings from '../types/settingsTypes';
import { AppException } from '../exceptions/AppException';
import { ExceptionConstants } from '../constants/exceptionConstants';
import { config } from 'dotenv';

config();

const appSettings: IAppSettings = {
    awsRegion: '',
    awsTableName: '',
    host: '',
    port: 0,
};

const getAppSettings = (): IAppSettings => {
    if (appSettings.host && appSettings.port && appSettings.awsRegion && appSettings.awsTableName) {
        return appSettings;
    }

    const host: string = process.env.HOST;
    const port = Number(process.env.PORT);
    const awsRegion: string = process.env.AWS_REGION_NAME;
    const awsTableName: string = process.env.AWS_TABLE_NAME;

    if (!host || !port || !awsRegion || !awsTableName) {
        throw new AppException(ExceptionConstants.ServiceUnavailable, 'No env params to start app');
    }

    appSettings.host = host;
    appSettings.port = port;
    appSettings.awsRegion = awsRegion;
    appSettings.awsTableName = awsTableName;

    return appSettings;
};

export default getAppSettings;
