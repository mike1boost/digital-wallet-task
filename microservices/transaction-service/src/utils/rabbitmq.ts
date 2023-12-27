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

const publishMessage = async (channel: amqp.Channel, queue: string, message: any) => {
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  } catch (error) {
    console.error('Error publishing message to RabbitMQ:', error);
    throw error;
  }
};

export { connectToRabbitMQ, publishMessage };
