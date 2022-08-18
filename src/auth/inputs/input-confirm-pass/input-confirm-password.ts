import { InputBaseElement } from '../input-base';

export class InputConfirmPassword extends InputBaseElement {
  currentPasswordField: InputBaseElement;

  currentCompare: [RegExp, string];

  constructor(passField: InputBaseElement) {
    const currentPass: [RegExp, string] = [new RegExp(passField.getValue()),
      'Блин, опять не совпадает...'];
    super('password', 'Подтвердите пароль', [
      [new RegExp('.{1,}', 'g'), 'Поле не может быть пустым'],
      currentPass,
    ]);
    this.currentPasswordField = passField;
    this.currentCompare = currentPass;
    this.getHtmlTag().addEventListener('click', () => {
      this.currentCompare[0] = new RegExp('^' +
        this.currentPasswordField.getValue() + '$');
    });
    this.getHtmlTag().addEventListener('keyup', () => this.validate());
  }
}
