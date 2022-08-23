import {
  FieldPlaceholder,
  FieldValidateError,
  IInputBaseElement,
} from '../interfaces/inputs';
import { InputBaseElement } from '../input-base';

export class InputConfirmPassword extends InputBaseElement {
  private readonly currentPasswordField: IInputBaseElement;

  private currentCompare: [RegExp, string];

  constructor(passField: IInputBaseElement) {
    const currentPass: [RegExp, string] = [new RegExp(passField.getValue()),
      FieldValidateError.notEqualyPassword];
    super('password', FieldPlaceholder.enterConfirmPassword, [
      [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
      currentPass,
    ]);
    this.currentPasswordField = passField;
    this.currentCompare = currentPass;
    this.element.addEventListener('click', () => {
      this.currentCompare[0] = new RegExp('^' +
        this.currentPasswordField.getValue() + '$');
    });
    this.element.addEventListener('keyup', () => this.validate());
  }
}
