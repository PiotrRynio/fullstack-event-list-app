export class RegisterCommand {
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: { firstName: string; lastName: string; userEmail: string; userEventData: Date }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
