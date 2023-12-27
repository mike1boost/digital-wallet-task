import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './utils/mongoDbConnection';
import transactionRoutes from './routes/transaction';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(bodyParser.json());
app.use('/api', transactionRoutes);

const startServer = async () => {
  const server = app.listen(port, () => {
    console.log(`Transaction Service is running on http://localhost:${port}`);
  });

  const handleTermination = async () => {
    console.log('Received termination signal. Closing server and database connection');
    await closeDatabaseConnection();
    console.log('Server and database connection closed. Exiting');
    process.exit(0);
  };

  process.on('SIGINT', handleTermination);
  process.on('SIGTERM', handleTermination);
};

connectToDatabase()
  .then(() => {
    console.log('Database connected successfully. Starting the server...');
    startServer();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });
