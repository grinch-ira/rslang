import { Form } from '../form-base/form';
import { BaseElement } from '../../../shared/components/base-element/base-element';
import { apiSignIn } from '../../../api/api-sign-in';
import { FormErrorMsg, IForm } from '../../models/forms';
import { StatusCode } from '../../../api/api-interfaces';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../models';
import { FieldPlaceholder } from '../../models/inputs';
import { InputBaseElement } from '..';

export class FormAutorization extends Form implements IForm {
  private email: InputBaseElement;

  private pass: InputBaseElement;

  constructor() {
    super();
    this.email = new InputBaseElement('email', FieldPlaceholder.enterEmail, EMAIL_REGEXP);
    this.validateElementContainer.push(this.email);
    this.pass = new InputBaseElement(
      'password',
      FieldPlaceholder.enterPassword,
      PASSWORD_REGEXP,
    );
    this.validateElementContainer.push(this.pass);
    this.htmlButtonSubmit.textContent = 'Войти';
    this.element.append(
      new BaseElement('div', 'form__title', 'Уже с нами?').element,
      new BaseElement('div', 'form__todo', 'Войдите в свой аккаунт RSLang!').element,
      this.email.element,
      this.pass.element,
      this.htmlButtonSubmit,
    );
    this.htmlButtonSubmit.addEventListener('click', (event) => this.buttonHandler(event));
  }

  private buttonHandler(event: Event): void {
    event.preventDefault();
    if (this.isValid) {
      const email = this.email.getValue().toLowerCase();
      const pass = this.pass.getValue();
      apiSignIn.signIn(email, pass)
        .then((result) => {
          if (result.statusCode !== StatusCode.Success) {
            this.drawInfoMessage(FormErrorMsg.notValidEmailPassword);
          } else {
            localStorage.setItem('auth', JSON.stringify(result.body));
          // TODO redirect to Router!!!
          }
        });
    } else {
      this.drawInfoMessage(FormErrorMsg.notValidInput);
    }
  }
}
