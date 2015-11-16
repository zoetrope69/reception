import { createValidator, required, oneOf, email } from 'utils/validation';

export const locations = ['Reception', 'Floor 1', 'Floor 2', 'Floor 3'];

const settingValidation = createValidator({
  visibility: [required],
  type: [required, oneOf(locations)],
  name: [required],
  email: [required, email],
  website: [required]
});
export default settingValidation;
