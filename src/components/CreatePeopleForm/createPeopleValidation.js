import memoize from 'lru-memoize';
import { createValidator, required, maxLength, email } from 'utils/validation';

const createPeopleValidation = createValidator({
  firstName: [required, maxLength(30)],
  lastName: [required, maxLength(30)],
  email: [required, email]
});
export default memoize(10)(createPeopleValidation);
