export class RegistrationDto {
  readonly registrationId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventDate: string;

  constructor(props: {
    registrationId: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    userEventDate: string;
  }) {
    this.registrationId = props.registrationId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventDate = props.userEventDate;
  }
}
