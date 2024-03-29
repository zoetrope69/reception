const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  if (!isEmpty(value) && !/^\S+@\S+\.\S+$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function aUppercaseChar(value) {
  if (!isEmpty(value) && !/^((?=.*[A-Z]).*)$/i.test(value)) {
    return 'Needs at least one uppercase (A) character';
  }
}

export function aLowercaseChar(value) {
  if (!isEmpty(value) && !/^((?=.*[a-z]).*)$/i.test(value)) {
    return 'Needs at least one lowercase (a) character';
  }
}

export function aNumberChar(value) {
  if (!isEmpty(value) && !/^((?=.*\d).*)$/i.test(value)) {
    return 'Needs at least one number character';
  }
}

export function aSpecialChar(value) {
  if (!isEmpty(value) && !/^((?=.*[\W_]).*)$/i.test(value)) {
    return 'Needs at least one special character (!%^&)';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
