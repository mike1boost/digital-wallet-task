import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    return connection;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

export { connectToRabbitMQ };
