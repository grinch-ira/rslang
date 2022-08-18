import { Form } from '../form-base/form';
import { BaseElement } from '../../../utils/basic-element/base-element';
import { InputEmail } from '../../inputs/input-email/input-email';
import { InputPassword } from '../../inputs/input-password/input-password';
import { InputConfirmPassword } from
  '../../inputs/input-confirm-pass/input-confirm-password';
import './form-registration.scss';
import { InputName } from '../../inputs/input-name/input-name';

export class FormRegistration extends Form {
  protected htmlButtonSend: HTMLButtonElement;

  private htmlContainer: HTMLFormElement;

  constructor() {
    super();
    const email = new InputEmail();
    this.validateElementContainer.push(email);
    const pass = new InputPassword();
    this.validateElementContainer.push(pass);
    const name = new InputName();
    this.validateElementContainer.push(name);
    const confirmPass = new InputConfirmPassword(pass);
    this.validateElementContainer.push(confirmPass);
    this.htmlButtonSend = new BaseElement(
      'button',
      'form__button-send',
      'Зарегистрироваться',
    ).element;
    this.htmlContainer = new BaseElement(
      'form',
      'form',
      [
        new BaseElement('div', 'form__title', 'Заргистрируйся в RSLang!!!').element,
        new BaseElement(
          'div',
          'form__todo',
          '... и изучай английский вместе с нами',
        ).element,
        email.getHtmlTag(),
        name.getHtmlTag(),
        pass.getHtmlTag(),
        confirmPass.getHtmlTag(),
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
