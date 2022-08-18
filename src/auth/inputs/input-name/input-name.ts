import { InputBaseElement } from '../input-base';

export class InputName extends InputBaseElement {
  constructor() {
    super('text', 'Имя', [
      [new RegExp('.{1,}', 'g'), 'Поле не может быть пустым'],
      [new RegExp('^[^0-9]*$'), 'Имя не должно содержать цифр'],
      [new RegExp('^[a-zA-Zа-яА-Я0-9\\s]*$'), 'Имя не должно содержать спецсимволов'],
    ]);
  }
}
