import memoize from 'lru-memoize';
import { createValidator, required, maxLength, minLength, email } from 'utils/validation';

const AdminPersonNewValidation = createValidator({
  firstName: [required, minLength(1), maxLength(30)],
  lastName: [required, minLength(1), maxLength(30)],
  email: [required, email]
});
export default memoize(10)(AdminPersonNewValidation);
