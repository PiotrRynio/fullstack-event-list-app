import mongoose from 'mongoose';

export async function connectToMongoDb(): Promise<void> {
  const isIncorrectMongoConnectionString = !(
    process.env.MONGO_HOST &&
    process.env.MONGO_PORT &&
    process.env.MONGO_DB &&
    (process.env.MONGO_IS_AUTHENTICATION !== 'true' || (process.env.MONGO_USER && process.env.MONGO_PASSWORD))
  );

  if (isIncorrectMongoConnectionString) {
    throw new Error('[MyApplication]: Connection string to MongoDB is not defined!');
  }

  const mongoConnectionString =
    process.env.MONGO_IS_AUTHENTICATION === 'true'
      ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`
      : `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

  await mongoose
    .connect(mongoConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`[MyApplication]: Application connected to mongoDB instance at: ${mongoConnectionString}`))
    .catch((error) =>
      console.error(`[MyApplication]: Error while connecting to mongo db at: ${mongoConnectionString}`, error),
    );
}
