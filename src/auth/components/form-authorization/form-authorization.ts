import { Form } from '../form-base/form';
import { apiSignIn } from '../../../api/api-sign-in';
import { FormErrorMsg, IForm } from '../../models/forms';
import { StatusCode } from '../../../api/api-interfaces';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../models';
import { FieldPlaceholder } from '../../models/inputs';
import { FieldInputElement } from '..';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class FormAuthorization extends Form implements IForm {
  private email: FieldInputElement;

  private pass: FieldInputElement;

  constructor() {
    super();
    this.email = new FieldInputElement(
      'email',
      FieldPlaceholder.enterEmail,
      EMAIL_REGEXP,
    );
    this.validateElementContainer.push(this.email);
    this.pass = new FieldInputElement(
      'password',
      FieldPlaceholder.enterPassword,
      PASSWORD_REGEXP,
    );
    this.validateElementContainer.push(this.pass);
    this.htmlButtonSubmit.textContent = 'Войти';
    this.element.append(
      new BaseComponent('div', ['form__title'], 'Уже с нами?').element,
      new BaseComponent('div', ['form__todo'], 'Войдите в свой аккаунт RSLang!').element,
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
          // TODO: redirect to Router!!!
          }
        });
    } else {
      this.drawInfoMessage(FormErrorMsg.notValidInput);
    }
  }
}
