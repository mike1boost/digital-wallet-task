# Digital Wallet App

## Introduction

The Digital Wallet App is a simple application that enables users to perform digital transactions and receive notifications after the money is transferred.

## Features

- Digital transactions between users
- Balances management
- Transaction history tracking
- Transaction notifications 

## Getting Started

Follow the steps below to set up and run the Digital Wallet App locally.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- RabbitMQ installed and running

### Configuration

The default urls are:
digital-wallet-task/projectSetupScript.ts
    - connectionUrl = 'mongodb://localhost:27017/digital_wallet'

digital-wallet-task/microservices/transaction-service/.env
    - MONGODB_URL=mongodb://localhost:27017/digital_wallet
    - RABBITMQ_URL=amqp://localhost
    - SERVER_PORT=3001

digital-wallet-task/microservices/notification-service/.env
    - MONGODB_URL=mongodb://localhost:27017/digital_wallet
    - RABBITMQ_URL=amqp://localhost

### Installation And Usage

git clone https://github.com/your-username/digital-wallet-task.git

cd digital-wallet-task
npm install
npx ts-node ./projectSetupScript.ts

digital-wallet-task/microservices/transaction-service
npm install
npm start or npm run dev (with nodemon)

digital-wallet-task/microservices/notification-service
npm install
npm start or npm run dev (with nodemon)

### Testing

After running the projectSetupScript.ts script, two users will created in the mongodb under the users collection.
Console.log will show the users ids, example:
    - Collections created successfully.
        User created with ID: 658be4eced72ef6a83564d9e
        User created with ID: 658be4eced72ef6a83564da0
Please use the ids for a http request:
    - POST http://localhost:3001/api/transactions
    - Body {
    "senderId": "658be4eced72ef6a83564d9e",
    "receiverId": "658be4eced72ef6a83564da0",
    "amount": 5
    }

Then, in the notification service, you will receive the output of the notification message.
