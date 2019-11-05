import validator from 'validator';
import isEmpty   from 'lodash/isEmpty';

export default function validateInput(data, fields) {
  let errors = {};

  for (let field of fields) {
    if (!data[field]) errors[field] = `Please enter your ${field}`;
  }

  if (!errors.email && !validator.isEmail(data.email)) errors.email = 'Email is invalid';

  return { errors, isValid: isEmpty(errors) }
}
