export class PostCreateRegistrationRequestBody {
  constructor(
    readonly firstName: string,
    readonly secondName: string,
    readonly userEmail: string,
    readonly userEventData: Date,
  ) {}
}
