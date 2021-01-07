# Users Manager Frontend

This is the frontend repository of the Users Manager fullstacktest click [HERE](https://github.com/syvelasquez10/users-manager-back) to go to the backend repository.

Layout
-------------

For the layout I used the following tools:

- HTML5
- CSS3
- [Ant Design](https://ant.design/)

Installation and Running
-------------
To install and run the application execute the following commands:

```bash
git clone https://github.com/syvelasquez10/users-manager-front.git
cd users-manager-front
npm i
npm start
```

The application will be served on localhost:3000

Test
-------------
The test were created using Enzyme. 

To run the test execute the following command:

```bash
npm run test
```

Process
-------------
If you want to know more about the process of creating this project check the issues. Each issue has a description of the functionalities developt on the project. And most of the commits on the master branch are related to one issue.

Architecture
-------------
You can see the architecture of the project on the following diagram. There project has 3 parts primarly. A frontend created using React, a group of micro-services created on AWS Lambda using NodeJS, and a Mongo as a service database using the MongoDB Atlas clusters. The frontend consumes the micro-services through an AWS API Gateway, the API was defined using Swagger. You can find the API definition [HERE](https://app.swaggerhub.com/apis/syvelasquez10/users-manager-back/1.0.0). The API Gateway enpoints trigger a Lambda function that connects to the Mongo database to optain, store, update or delete the information neeed.

![Architecture Diagram](https://raw.githubusercontent.com/syvelasquez10/users-manager-front/main/architectureDiagram.png "Architecture Diagram")


