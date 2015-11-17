import memoize from 'lru-memoize';
import { createValidator, required, maxLength, oneOf, email } from 'utils/validation';

export const locations = ['Reception', 'Floor 1', 'Floor 2', 'Floor 3'];

const createPeopleValidation = createValidator({
  name: [required, maxLength(30)],
  location: [required, maxLength(30), oneOf(locations)],
  personFirstName: [required, maxLength(30)],
  personLastName: [required, maxLength(30)],
  personEmail: [required, email]
});
export default memoize(10)(createPeopleValidation);
