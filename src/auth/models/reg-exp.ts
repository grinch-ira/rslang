import { FieldValidateError } from './inputs';

// eslint-disable-next-line max-len
const emailRegexp = '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';


export const NAME_REGEXP: [RegExp, FieldValidateError][] = [
  [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
  [new RegExp('^[^0-9]*$'), FieldValidateError.fieldCouldntContainNumber],
  [new RegExp('^[a-zA-Zа-яА-Я0-9\\s]*$'), FieldValidateError.fieldCouldntContainSymbol],
];

export const PASSWORD_REGEXP: [RegExp, FieldValidateError][] = [
  [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
  [new RegExp('(?=.*[0-9])', 'g'), FieldValidateError.fieldNeedNumber],
  [new RegExp('(?=.*[!@#$%^&*№;:=+-_])', 'g'), FieldValidateError.fieldNeedSymbol],
  [new RegExp('(?=.*[a-zа-я])', 'g'), FieldValidateError.fieldNeedSmallLetter],
  [new RegExp('(?=.*[A-ZА-Я])', 'g'), FieldValidateError.fieldNeedUpperLetter],
  [new RegExp('[0-9a-zа-яA-ZА-Я!@#$%^&*№;:=+-_]{8,}', 'g'),
    FieldValidateError.fieldNeedSixOrMoreLength],
];

export const EMAIL_REGEXP: [RegExp, FieldValidateError][] = [
  [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
  [new RegExp(emailRegexp), FieldValidateError.emailNotCorrect],
];

export const CONFIRM_PASSWORD_REGEXP: [RegExp, FieldValidateError][] = [
  [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
  [new RegExp(''), FieldValidateError.notEqualyPassword],
];
