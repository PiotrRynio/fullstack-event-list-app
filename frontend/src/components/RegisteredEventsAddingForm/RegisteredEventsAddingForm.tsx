import { Typography, TypographyTag } from 'components/Typography';
import { Button, Form, Input, InputsGroups, Label, ValidationHint, Wrapper } from './RegisteredEventsAddingForm.styles';

export const RegisteredEventsAddingForm = () => {
  return (
    <Wrapper>
      <Typography typographyTag={TypographyTag.HEADING_4}>Add new event:</Typography>
      <Form>
        <InputsGroups>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>First name:</Typography>
            <Input placeholder={'Write your first name...'} />
            <ValidationHint>Lorem ipsum</ValidationHint>
          </Label>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Last Name:</Typography>
            <Input placeholder={'Write your last name...'} />
            <ValidationHint>Lorem ipsum</ValidationHint>
          </Label>
        </InputsGroups>
        <InputsGroups>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Email:</Typography>
            <Input placeholder={'Write your email...'} type="email" />
            <ValidationHint>Lorem ipsum</ValidationHint>
          </Label>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Event Data:</Typography>
            <Input type="date" />
            <ValidationHint>Lorem ipsum</ValidationHint>
          </Label>{' '}
        </InputsGroups>

        <Button>Submit</Button>
      </Form>
    </Wrapper>
  );
};
