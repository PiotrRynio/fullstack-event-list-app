import { useForm, FieldValues } from 'react-hook-form';
import { Typography, TypographyTag } from 'components/Typography';
import {
  useRegisteredEventsMutation,
  UseRegisteredEventsMutationParams,
} from 'apiHooks/useRegisteredEvents/useRegisteredEventsMutation';
import {
  DATE_REGEX_PATTERN,
  EMAIL_REGEX_PATTERN,
  FIRST_NAME_REGEX_PATTERN,
  LAST_NAME_REGEX_PATTERN,
} from 'constants/regexPatterns';
import { HUNDRED_YEARS_IN_MILLISECONDS } from 'constants/times';
import { Button, Form, Input, InputsGroups, Label, ValidationHint, Wrapper } from './RegisteredEventsAddingForm.styles';

export const RegisteredEventsAddingForm = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: new Date().toLocaleDateString('en-CA'),
  };
  const { data, mutate } = useRegisteredEventsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: initialFormState,
  });

  const onSubmit = (formData: FieldValues) => {
    const eventsForRegistration: UseRegisteredEventsMutationParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      eventData: new Date(formData.eventDate),
    };
    mutate(eventsForRegistration);
    reset();
  };

  console.log(data);

  return (
    <Wrapper>
      <Typography typographyTag={TypographyTag.HEADING_4}>Add new event:</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputsGroups>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>First name:</Typography>
            <Input
              type="text"
              placeholder={'Write your first name...'}
              {...register('firstName', {
                required: true,
                minLength: 2,
                maxLength: 30,
                pattern: FIRST_NAME_REGEX_PATTERN,
              })}
            />
            <ValidationHint>{formErrors.firstName && 'Invalid first name'}</ValidationHint>
          </Label>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Last Name:</Typography>
            <Input
              type="text"
              placeholder={'Write your last name...'}
              {...register('lastName', {
                required: true,
                minLength: 2,
                maxLength: 30,
                pattern: LAST_NAME_REGEX_PATTERN,
              })}
            />
            <ValidationHint>{formErrors.lastName && 'Invalid last name'}</ValidationHint>
          </Label>
        </InputsGroups>
        <InputsGroups>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Email:</Typography>
            <Input
              type="text"
              placeholder={'Write your email...'}
              {...register('email', { required: true, pattern: EMAIL_REGEX_PATTERN })}
            />
            <ValidationHint>{formErrors.email && 'Invalid email address'}</ValidationHint>
          </Label>
          <Label>
            <Typography typographyTag={TypographyTag.OVERLINE}>Event Data:</Typography>
            <Input
              type="date"
              {...register('eventDate', {
                pattern: DATE_REGEX_PATTERN,
                validate: isEventDataCorrect,
              })}
            />
            <ValidationHint>{formErrors.eventDate && 'Invalid future date'}</ValidationHint>
          </Label>
        </InputsGroups>

        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

function isEventDataCorrect(checkedDate: string) {
  const currentDate = new Date(new Date().toLocaleDateString('en-CA'));
  const eventDate = new Date(checkedDate);

  const isEventDateCorrect =
    eventDate.getTime() >= currentDate.getTime() &&
    eventDate.getTime() < currentDate.getTime() + HUNDRED_YEARS_IN_MILLISECONDS;

  return isEventDateCorrect;
}
