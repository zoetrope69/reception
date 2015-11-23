import { createValidator, required, maxLength, oneOf, email } from 'utils/validation';

export const types = ['Hot Desk', 'Full Time', 'Staff'];

const peopleValidation = createValidator({
  visibility: [required],
  type: [required, oneOf(types)],
  firstName: [required, maxLength(30)],
  lastName: [required, maxLength(30)],
  email: [required, email]
});
export default peopleValidation;
