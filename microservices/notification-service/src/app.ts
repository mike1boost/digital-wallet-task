import { connectToRabbitMQ } from './utils/rabbitmq';
import { connectToDatabase, closeDatabaseConnection } from './utils/mongoDbConnection';
import sendNotificationService from './services/notification';

const startNotificationService = async () => {
  const rabbitMQConnection = await connectToRabbitMQ();
  await connectToDatabase();

  const channel = await rabbitMQConnection.createChannel();
  const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME || 'transactions';
  // consumer
  channel.consume(QUEUE_NAME, (msg: any) => {
    if (msg) {
      try {
        const message = JSON.parse(msg.content.toString());
        sendNotificationService(message);
      } catch (error) {
        console.error('Error processing message:', error);
      } finally {
        // Acknowledge the message to remove it from the queue
        channel.ack(msg);
      }
    }
  });

  console.log('Notification Service is running. Waiting for messages');

  // Keep the process running until it's manually terminated
  process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing connections');
    await closeDatabaseConnection();
    channel.close();
    rabbitMQConnection.close();
    process.exit(0);
  });
};

startNotificationService().catch((error) => console.error('Application error:', error));
