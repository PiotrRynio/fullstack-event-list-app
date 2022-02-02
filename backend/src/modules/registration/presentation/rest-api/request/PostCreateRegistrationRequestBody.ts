export class PostCreateRegistrationRequestBody {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly userEmail: string,
    readonly userEventData: string,
  ) {}
}
