import { Form } from '../form-base';
import { InputEmail } from '../../inputs/input-email/input-email';
import { InputPassword } from '../../inputs/input-password/input-password';
import { BaseElement } from '../../../utils/basic-element/base-element';
import './form-autorization.scss';

export class FormAutorization extends Form {

  protected htmlButtonSend: HTMLButtonElement;

  private htmlContainer: HTMLFormElement;

  constructor() {
    super();
    const email = new InputEmail();
    this.validateElementContainer.push(email);
    const pass = new InputPassword();
    this.validateElementContainer.push(pass);
    this.htmlButtonSend = new BaseElement('button', 'form__button-send', 'Войти').element;
    this.htmlContainer = new BaseElement(
      'form',
      'form',
      [
        new BaseElement('div', 'form__title', 'Уже с нами?').element,
        new BaseElement('div', 'form__todo', 'Войдите в свой аккаунт RSLang!').element,
        email.getHtmlTag(),
        pass.getHtmlTag(),
        this.htmlButtonSend,
      ]).element;
    this.htmlButtonSend.addEventListener('click', (event) => this.buttonHandler(event));
  }

  buttonHandler(event: Event) {
    event.preventDefault();
    if (this.isValid()) {
      console.log(this.isValid());
      // fetch();
    } else {
      // drop fetch;
    }
  }

  getHtmlTag(): HTMLFormElement {
    return this.htmlContainer;
  }
}
