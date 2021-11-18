import IAppSettings from "../types/settings.types";

let appSettings: IAppSettings = {
    awsRegion: "",
    awsTableName: "",
    host: "",
    port: 0
}

const getAppSettings = (): void => {
    appSettings.host = process.env.HOST ?? 'localhost';
    appSettings.port =  process.env.PORT ? Number(process.env.PORT) : 3006;
    appSettings.awsRegion = process.env.AWS_REGION ?? '';
    appSettings.awsTableName = process.env.AWS_TABLE_NAME ?? '';
};

getAppSettings();

export default appSettings;
