import { FieldPlaceholder, FieldValidateError } from '../../inputs/interfaces/inputs';
import { InputBaseElement } from '../input-base';

export class InputEmail extends InputBaseElement {
  constructor() {
    const regExpToCheckEmail = new RegExp([
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|',
      '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join(''));
    super('email', FieldPlaceholder.enterEmail, [
      [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
      [regExpToCheckEmail, FieldValidateError.emailNotCorrect],
    ]);
  }
}
