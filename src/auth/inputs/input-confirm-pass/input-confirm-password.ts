import { InputBaseElement } from '../input-base';

export class InputConfirmPassword extends InputBaseElement {
  currentPasswordField: InputBaseElement;

  constructor(passField: InputBaseElement) {
    super('password', 'Подтвердите пароль', [
      [new RegExp('.{1,}', 'g'), 'Поле не может быть пустым'],
      [new RegExp('(?=.*[0-9])', 'g'), 'Пароль должен содержать хотябы одно число'],
      [new RegExp('(?=.*[!@#$%^&*№;:=+-])', 'g'),
        'Пароль должен содержать хотябы один спецсимвол из набора !@#$%^&*№;:=+-'],
      [new RegExp('(?=.*[a-zа-я])', 'g'),
        'Пароль должен содержать хотябы одну букву в нижнем регистре'],
      [new RegExp('(?=.*[A-ZА-Я])', 'g'),
        'Пароль должен содержать хотябы одну букву в верхнем регистре'],
      [new RegExp('[0-9a-zа-яA-ZА-Я!@#$%^&*№;:=+-]{6,}', 'g'),
        'Пароль состоит не менее чем из 6-ти символов'],
    ]);
    this.currentPasswordField = passField;

  }
}
