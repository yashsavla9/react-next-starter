import _ from "lodash";

export default class ValidatorUtil {
  static isRequired = value => {
    if (_.isArray(value)) {
      return value.length !== 0;
    }

    if (_.isString(value)) {
      return value.trim().length !== 0;
    }

    if (_.isNull(value) || _.isUndefined(value)) {
      return false;
    }

    return true;
  };

  static isEqual = referenceValue => value => referenceValue === value;

  static matchRegex = regex => value => regex.test(value);

  static hasMinLength = min => value =>
    _.isArray(value) || _.isString(value) ? value.length >= min : false;

  static hasMaxLength = max => value =>
    _.isArray(value) || _.isString(value) ? value.length <= max : false;

  static isWithinLength = (min, max) => value =>
    _.isArray(value) || _.isString(value)
      ? value.length >= min && value.length <= max
      : false;

  static contains = seed => value =>
    _.isArray(value) || _.isString(value) ? value.indexOf(seed) !== -1 : false;

  static isString = value => _.isString(value);

  static isEmail = value =>
    ValidatorUtil.matchRegex(
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    )(value);

  static isInt = value => _.isInteger(parseFloat(value, 10));

  static isPositiveInt = value => ValidatorUtil.isInt(value) && value > 0;

  static isWithinInt = (min, max) => value =>
    ValidatorUtil.isInt(value) && value >= min && value <= max;

  static isNumeric = (precision, scale) => value => {
    const highestNumber = 10 ** (precision - scale) - 10 ** -scale;
    return value >= -highestNumber && value <= highestNumber;
  };

  static isPostiveNumeric = (precision, scale) => value =>
    ValidatorUtil.isNumeric(precision, scale)(value) && value > 0;

  static isWithinNumeric = (precision, scale, min, max) => value =>
    ValidatorUtil.isNumeric(precision, scale)(value) &&
    value >= min &&
    value <= max;

  static isMobile = value => ValidatorUtil.matchRegex(/^[0-9]{7,}$/g)(value);

  static isOptionalMobile = value =>
    ValidatorUtil.matchRegex(/^$|[0-9]{7,}$/g)(value);

  static isLowercase = value => ValidatorUtil.matchRegex(/^[a-z]*$/)(value);

  static isUppercase = value => ValidatorUtil.matchRegex(/^[A-Z]*$/)(value);

  static isPassword = (
    requireSmallLetter = true,
    requireCapitalLetter = true,
    requireNumber = true,
    requireSpecialCharacter = true
  ) => value => {
    let passwordValidity = true;
    if (requireSmallLetter && passwordValidity) {
      passwordValidity = ValidatorUtil.matchRegex(/[a-z]+/)(value);
    }
    if (requireCapitalLetter && passwordValidity) {
      passwordValidity = ValidatorUtil.matchRegex(/[A-Z]+/)(value);
    }
    if (requireNumber && passwordValidity) {
      passwordValidity = ValidatorUtil.matchRegex(/[0-9]+/)(value);
    }
    if (requireSpecialCharacter && passwordValidity) {
      passwordValidity = ValidatorUtil.matchRegex(/[!@#$%^&*_]+/)(value);
    }
    return passwordValidity;
  };

  static isPhone = value =>
    ValidatorUtil.matchRegex(/^\+?([0-9-]){9,}$/)(value);

  static isValidJSONObject = value => {
    try {
      const resultValue = JSON.parse(value);
      return _.isObject(resultValue) ? !_.isArray(resultValue) : false;
    } catch (err) {
      return false;
    }
  };

  static isValidJSONList = value => {
    try {
      return _.isArray(JSON.parse(value));
    } catch (err) {
      return false;
    }
  };

  static isFunction(value) {
    if (value && {}.toString.call(value) === "[object Function]") {
      return true;
    }
    return false;
  }
}
