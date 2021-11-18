import IAppSettings from "../types/settings.types";

export const getAppSettings = (): IAppSettings => ({
    host: process.env.HOST ?? 'localhost',
    port:  process.env.PORT ? Number(process.env.PORT) : 3006,
});
