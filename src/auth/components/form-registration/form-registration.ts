import { Form } from '../form-base/form';
import { FormErrorMsg, IForm } from '../../models/forms';
import { FieldPlaceholder, IInputBaseElement } from '../../models/inputs';
import { apiUsers } from '../../../api/api-users';
import { apiSignIn } from '../../../api/api-sign-in';
import { StatusCode } from '../../../api/api-interfaces';
import { InputBaseElement } from '../../components';
import {
  CONFIRM_PASSWORD_REGEXP,
  EMAIL_REGEXP,
  NAME_REGEXP,
  PASSWORD_REGEXP,
} from '../../models';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class FormRegistration extends Form implements IForm {
  private readonly email: IInputBaseElement;

  private readonly password: IInputBaseElement;

  private readonly name: IInputBaseElement;

  private readonly confirmPass: IInputBaseElement;

  constructor() {
    super();
    this.email = new InputBaseElement('email', FieldPlaceholder.enterEmail, EMAIL_REGEXP);
    this.password = new InputBaseElement(
      'password',
      FieldPlaceholder.enterPassword,
      PASSWORD_REGEXP,
    );
    this.name = new InputBaseElement('text', FieldPlaceholder.enterName, NAME_REGEXP);

    this.confirmPass = new InputBaseElement(
      'password',
      FieldPlaceholder.enterConfirmPassword,
      CONFIRM_PASSWORD_REGEXP,
    );

    this.confirmPass.element.addEventListener('click', () => {
      this.confirmPass.compareRegExp[1][0] = new RegExp('^' +
      this.password.getValue() + '$');
    });

    this.confirmPass.element.addEventListener('keyup', () => this.confirmPass.validate());

    this.validateElementContainer.push(
      this.email,
      this.password,
      this.name,
      this.confirmPass);
    this.htmlButtonSubmit.textContent = 'Зарегистрироваться';
    this.element.append(
      new BaseComponent('div', ['form__title'], 'Зарегистрируйся в RSLang!!!').element,
      new BaseComponent(
        'div',
        ['form__todo'],
        '... и изучай английский вместе с нами',
      ).element,
      this.email.element,
      this.name.element,
      this.password.element,
      this.confirmPass.element,
      this.htmlButtonSubmit,
    );
    this.htmlButtonSubmit.addEventListener('click', (event) => this.submitHandler(event));
  }

  private submitHandler(event: Event): void {
    event.preventDefault();

    if (this.isValid) {
      const name = this.name.getValue();
      const email = this.email.getValue();
      const password = this.password.getValue();
      apiUsers.createANewUser(name, email, password).then((resultCreate) => {
        switch (resultCreate.statusCode) {
          case StatusCode.Success:
            apiSignIn.signIn(this.email.getValue(), this.password.getValue())
              .then((resultAuth) => {

                if (resultAuth.statusCode !== StatusCode.Success) {
                  this.drawInfoMessage(FormErrorMsg.notValidEmailPassword);
                } else {
                  localStorage.setItem('auth', JSON.stringify(resultAuth.body));
                  // TODO: redirect to Router!!!
                  // console.log(resultAuth);
                }

              });
            break;

          case StatusCode.ExpectationFailed:
            this.drawInfoMessage(FormErrorMsg.userAlreadyExist);
            break;

          case StatusCode.UnprocessableEntity:
            this.drawInfoMessage(FormErrorMsg.notValidEmailPassword);
            break;
        }
      });
    } else {
      this.drawInfoMessage(FormErrorMsg.notValidInput);
    }
  }
}
