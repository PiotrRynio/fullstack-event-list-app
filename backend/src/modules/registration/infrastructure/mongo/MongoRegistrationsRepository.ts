import mongoose, { Schema } from 'mongoose';
import { RegistrationsRepository } from '../../application/RegistrationsRepository';
import { Registration } from '../../domain/Registration';

export class MongoRegistrationsRepository implements RegistrationsRepository {
  async save(registration: Registration): Promise<void> {
    await MongoRegistration.findOneAndUpdate(
      { _id: registration.registrationId },
      {
        _id: registration.registrationId,
        firstName: registration.firstName,
        secondName: registration.secondName,
        userEmail: registration.userEmail,
        userEventData: registration.userEventData,
      },
      { useFindAndModify: false, upsert: true },
    );
  }

  async findAll(): Promise<Registration[]> {
    const mongoFindResult = await MongoRegistration.find();
    return mongoFindResult.map((mongoDocument) => mongoDocumentToDomain(mongoDocument));
  }
}

type MongoRegistration = {
  readonly _id: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: Date;
} & mongoose.Document;

const RegistrationSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  firstName: Schema.Types.String,
  secondName: Schema.Types.String,
  userEmail: Schema.Types.String,
  userEventData: Schema.Types.Date,
});

const MongoRegistration = mongoose.model<MongoRegistration>('RegistrationSchema', RegistrationSchema);

function mongoDocumentToDomain(mongoDocument: MongoRegistration): Registration {
  return new Registration({
    registrationId: mongoDocument._id,
    firstName: mongoDocument.firstName,
    secondName: mongoDocument.secondName,
    userEmail: mongoDocument.userEmail,
    userEventData: mongoDocument.userEventData,
  });
}
