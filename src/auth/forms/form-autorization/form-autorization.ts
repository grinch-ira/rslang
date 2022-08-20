import { Form } from '../form-base';
import { InputEmail } from '../../inputs/input-email/input-email';
import { InputPassword } from '../../inputs/input-password/input-password';
import { BaseElement } from '../../../utils/base-element/base-element';
import './form-autorization.scss';
import { apiSingIn } from '../../../api/api-sing-in';
import { FormErrorMsg, IForm } from '../interfaces/forms';

export class FormAutorization extends Form implements IForm {

  private readonly email: InputEmail;

  private readonly pass: InputPassword;

  constructor() {
    super();
    this.email = new InputEmail();
    this.validateElementContainer.push(this.email);
    this.pass = new InputPassword();
    this.validateElementContainer.push(this.pass);
    this.htmlButtonSubmit.textContent = 'Войти';
    this.htmlContainer.append(
      new BaseElement('div', 'form__title', 'Уже с нами?').element,
      new BaseElement('div', 'form__todo', 'Войдите в свой аккаунт RSLang!').element,
      this.email.getHtmlTag(),
      this.pass.getHtmlTag(),
      this.htmlButtonSubmit,
    );
    this.htmlButtonSubmit.addEventListener('click', (event) => this.buttonHandler(event));
  }

  private buttonHandler(event: Event) {
    event.preventDefault();
    if (this.isValid()) {
      apiSingIn.signIn(this.email.getValue(), this.pass.getValue()).then((result) => {
        // TODO use enum, not magic number
        if (result.statusCode !== 200) {
          this.drawInfoMessage(FormErrorMsg.notValidEmailPassword);
        } else {
          localStorage.setItem('auth', JSON.stringify(result.body));
          // TODO redirect to Router!!!
        }
      });
    } else {
      this.drawInfoMessage(FormErrorMsg.notVolidInput);
    }
  }
}
