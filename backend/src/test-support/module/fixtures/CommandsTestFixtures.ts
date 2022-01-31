import { Command } from '../../../shared/Module/core/application/command/Command';

export class FirstTestCommand implements Command {
  readonly testId: string;

  constructor(props: { testId: string }) {
    this.testId = props.testId;
  }
}

export class SecondTestCommand implements Command {
  readonly testId: string;
  readonly testText: string;

  constructor(props: { testId: string; testText: string }) {
    this.testId = props.testId;
    this.testText = props.testText;
  }
}
