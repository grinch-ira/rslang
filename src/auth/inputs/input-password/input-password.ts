import { FieldPlaceholder, FieldValidateError } from '../interfaces/inputs';
import { InputBaseElement } from '../input-base';

export class InputPassword extends InputBaseElement {
  constructor() {
    super('password', FieldPlaceholder.enterPassword, [
      [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
      [new RegExp('(?=.*[0-9])', 'g'), FieldValidateError.fieldNeedNumber],
      [new RegExp('(?=.*[!@#$%^&*№;:=+-_])', 'g'), FieldValidateError.fieldNeedSymbol],
      [new RegExp('(?=.*[a-zа-я])', 'g'), FieldValidateError.fieldNeedSmallLetter],
      [new RegExp('(?=.*[A-ZА-Я])', 'g'), FieldValidateError.fieldNeedUpperLetter],
      [new RegExp('[0-9a-zа-яA-ZА-Я!@#$%^&*№;:=+-_]{6,}', 'g'),
        FieldValidateError.fieldNeedSixOrMoreLength],
    ]);
  }
}
