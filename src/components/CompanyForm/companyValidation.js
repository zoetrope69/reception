import { createValidator, required, oneOf, email } from 'utils/validation';

export const locations = ['Reception', 'Floor 1', 'Floor 2', 'Floor 3'];

const companyValidation = createValidator({
  visibility: [required],
  location: [required, oneOf(locations)],
  name: [required],
  email: email
});
export default companyValidation;
