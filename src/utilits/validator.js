/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired':
        statusValidate = data.trim() === '';
        break;
      case 'isEmail':
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      case 'isCapitalSymbol':
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      case 'isContainDigit':
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      case 'min':
        statusValidate = data.length < config.value;
        break;
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  Object.keys(data).forEach(fieldName => {
    Object.keys(config[fieldName]).forEach(validateMethod => {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    });
  });
  return errors;
}
