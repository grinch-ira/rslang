import { InputBaseElement } from '../input-base';

export class InputEmail extends InputBaseElement {
  constructor() {
    const regExpToCheckEmail = new RegExp([
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|',
      '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join(''));
    super('email', 'Введите E-mail', [
      [new RegExp('.{1,}', 'g'), 'Поле не может быть пустым'],
      [regExpToCheckEmail, 'Неверный E-mail'],
    ]);
  }
}
