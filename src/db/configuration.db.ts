import AWS from "aws-sdk";

const setupAwsConnection = (awsRegion: string) => {
    AWS.config.update({
        region: awsRegion,
    });
};

export default setupAwsConnection;
