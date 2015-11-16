import { createValidator, required, maxLength, oneOf, email } from 'utils/validation';

export const locations = ['Reception', 'Floor 1', 'Floor 2', 'Floor 3'];

const companyValidation = createValidator({
  visibility: [required],
  name: [required, maxLength(30)],
  location: [required, oneOf(locations)],
  email: [email]
});
export default companyValidation;
