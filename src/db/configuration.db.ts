import AWS from "aws-sdk";

const setupAwsConnection = (awsRegion: string) => {
    try {
        AWS.config.update({
            region: awsRegion,
        });
    } catch (error) {
        console.error(error);
    }
};

export default setupAwsConnection;
