export class RegistrationDto {
  readonly registrationId: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: string;

  constructor(props: {
    registrationId: string;
    firstName: string;
    secondName: string;
    userEmail: string;
    userEventData: string;
  }) {
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
