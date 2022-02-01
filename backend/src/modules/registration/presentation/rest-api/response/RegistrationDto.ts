export class RegistrationDto {
  readonly registrationId: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: {
    registrationId: string;
    firstName: string;
    secondName: string;
    userEmail: string;
    userEventData: Date;
  }) {
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
