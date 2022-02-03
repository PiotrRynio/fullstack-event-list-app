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
        lastName: registration.lastName,
        userEmail: registration.userEmail,
        userEventDate: registration.userEventDate,
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
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventDate: Date;
} & mongoose.Document;

const RegistrationSchema = new mongoose.Schema({
  _id: Schema.Types.String,
  firstName: Schema.Types.String,
  lastName: Schema.Types.String,
  userEmail: Schema.Types.String,
  userEventDate: Schema.Types.Date,
});

const MongoRegistration = mongoose.model<MongoRegistration>('RegistrationSchema', RegistrationSchema);

function mongoDocumentToDomain(mongoDocument: MongoRegistration): Registration {
  return new Registration({
    registrationId: mongoDocument._id,
    firstName: mongoDocument.firstName,
    lastName: mongoDocument.lastName,
    userEmail: mongoDocument.userEmail,
    userEventDate: mongoDocument.userEventDate,
  });
}
