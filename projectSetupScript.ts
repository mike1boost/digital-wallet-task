import mongoose from 'mongoose';

const connectionUrl = 'mongodb://localhost:27017/digital_wallet';

async function createProjectCollections() {
  try {
    const db = mongoose.connection.db;

    // Create collections
    await db.createCollection('users');
    await db.createCollection('transactions');
    await db.createCollection('users_transaction_histories');

    console.log('Collections created successfully.');
  } catch (error) {
    console.error('Error creating collections:', error);
  }
}

async function createMockUsers() {
  try {
    const usersCollection = mongoose.connection.collection('users');

    // Create mock users
    const newUser = {
      name: 'mike',
      balance: 350,
    };
    const newUser2 = {
      name: 'dan',
      balance: 500,
    };
    const result = await usersCollection.insertOne(newUser);
    const result2 = await usersCollection.insertOne(newUser2);

    console.log(`User created with ID: ${result.insertedId}`);
    console.log(`User created with ID: ${result2.insertedId}`);
  } catch (error) {
    console.error('Error creating mock users:', error);
  }
}

async function runPipeline() {
  try {
    await mongoose.connect(connectionUrl);

    await createProjectCollections();
    await createMockUsers();
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

runPipeline().catch((error) => console.error(error));
