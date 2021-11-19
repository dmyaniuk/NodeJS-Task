# NodeJS-Task

## __Environment and technologies__
- Express JS;
- Typescript (with support of Nodemon for hot-reloading, linters: Prettier, ESLint to make code style consistent for all team members);
- AWS Lambda;
- AWS DynamoDB;


## __Environment variables__
- Host - host of application. Example: localhost, http://example.com;
- Port - port to run app. Example: 80 (default for HTTP), 443 for (HTTPS);
- AWS_REGION - region for AWS DynamoDB. Example: us-west-1;
- AWS_TABLE_NAME - table name for AWS DynamoDB: Example: Customer, User; __Note__: there must be defined partition key with ___id___ name;

## __Application Structure__
The main idea of project architecture was taken from NodeJS was based on N-layer architecture with some specifics of __Express JS__ framework.
There are presented just 2 layers: DAL and PL. The reason to skip BLL is to avoid introduction of extra app levels due to lack of business logic to models (validators are part of the PL).
You may see the following folders in the main __src__:
- __constants__ - Default folder with constants describing the behaviour of models (entities), some reusable part of app;
- __controllers__ - PL for specifying endpoint that user may interact with;
- __db__ - DAL with defining of entrypoint of infrastructure database (AWS DynamoDB);
- __exceptions__ - Custom exceptions might be used for different levels;
- __middleware__ - Configuration for application http-middleware (exception handling, filters, routing);
- __types__ - Type definitions for app (for models, reusable object etc.);
- __utils__ - Small and reusable part of code all across the application;
- __index.ts__ - Entrypoint for app;

## __Notes__
Of course, this is just a small part of the real and functional commercial project and I've completed it in short period of time.
There are more ways to improve this code: 
- Introduction of __DI__ (with Inversify lib as an example) to make levels less dependent on each other, lifecycle of object is fully controlled by app DI container;
- Introduction of __mappers__ to make model levels more independent between each other;
- Applying new architecture approaches (Onion Architecture, CQRS, DDD, etc.) to make business support more efficient;
- Upgrade to __NestJS__ framework (it has a lot of advantages under the hood, like embedded DI, http-pipeline, extended support for __Express JS__ etc.)
- Implementation of Service and Functional tests to guarantee business flow works 100% correctly;
- Implementation of Open API standard to make endpoints descriptions (Swagger, like swagger-express-ui)
- Adding some validation libs (like express-validation, but I've decided to implement my own)
- Verifying packages health and vulnerabilities issues on [Snyk](https://snyk.io/test/) (as I saw in one article, they've advised to skip packages with huge size, like > 1.5mb, and also healthscore < 50-55%). Of course, it's better to have subscription to check your code for possible issues and vulnerabilities.
