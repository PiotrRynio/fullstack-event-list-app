export class RegisterCommand {
  readonly firstName: string;
  readonly secondName: string;
  readonly userEmail: string;
  readonly userEventData: Date;

  constructor(props: { firstName: string; secondName: string; userEmail: string; userEventData: Date }) {
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.userEmail = props.userEmail;
    this.userEventData = props.userEventData;
  }
}
