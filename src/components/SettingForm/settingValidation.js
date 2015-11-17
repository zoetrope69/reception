import { createValidator, required, maxLength, oneOf, email } from 'utils/validation';

export const types = ['Hot Desk', 'Full Time', 'Staff'];

const settingValidation = createValidator({
  visibility: [required],
  type: [required, oneOf(types)],
  firstName: [required, maxLength(30)],
  lastName: [maxLength(30)],
  email: [required, email],
  phone: [required],
  notificationSms: [required],
  notificationEmail: [required]
});
export default settingValidation;
