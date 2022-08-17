import { Form } from './form';
import { InputElement } from '../inputs/input-element';

export class FormAutorization extends Form {
  protected htmlInputEmail: HTMLDivElement;

  protected htmlInputPassword: HTMLInputElement;

  protected htmlButtonSend: HTMLButtonElement;

  constructor() {
    super();
    const re = new RegExp([
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|',
      '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join(''));
    const email = new InputElement('email', 'Введите E-mail', re);
    this.validateElementContainer.push(email);
    this.htmlInputEmail = email.getHtmlTag();
    const re2 = new RegExp(['(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])',
      '[0-9a-zA-Z!@#$%^&*]{6,}'].join(''), 'g');
    const pass = new InputElement('password', 'Введите пароль', re2);
    this.validateElementContainer.push(pass);
  }
}
