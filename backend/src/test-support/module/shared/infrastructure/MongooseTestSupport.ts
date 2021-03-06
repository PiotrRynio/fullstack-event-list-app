import mongoose from 'mongoose';
import { DatabaseTestSupport } from './DatabaseTestSupport';
import { connectToMongoDb } from '../../../../shared/Module/infrastructure/repository/connectToMongoDb';

export const MongoTestSupport: DatabaseTestSupport = {
  openConnection(): Promise<void> {
    return openTestMongoDbConnection();
  },
  closeConnection(): Promise<void> {
    return closeTestMongoDbConnection();
  },
  clearDatabase(): Promise<void> {
    return clearTestMongoDb();
  },
};

export async function openTestMongoDbConnection(): Promise<void> {
  await connectToMongoDb();
}

export const closeTestMongoDbConnection: () => Promise<void> = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
 * Remove all the data for all db collections.
 */
export const clearTestMongoDb: () => Promise<void> = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
