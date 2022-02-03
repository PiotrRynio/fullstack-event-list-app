export class RegisterCommand {
  readonly firstName: string;
  readonly lastName: string;
  readonly userEmail: string;
  readonly userEventDate: Date;

  constructor(props: { firstName: string; lastName: string; userEmail: string; userEventDate: Date }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.userEmail = props.userEmail;
    this.userEventDate = props.userEventDate;
  }
}
