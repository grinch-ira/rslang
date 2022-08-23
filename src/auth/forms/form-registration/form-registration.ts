import { Form } from '../form-base';
import { BaseElement } from '../../../utils/base-element/base-element';
import { InputEmail } from '../../inputs/input-email/input-email';
import { InputPassword } from '../../inputs/input-password/input-password';
import { InputConfirmPassword } from
  '../../inputs/input-confirm-pass/input-confirm-password';
import './form-registration.scss';
import { InputName } from '../../inputs/input-name/input-name';
import { FormErrorMsg, IForm } from '../interfaces/forms';
import { IInputBaseElement } from '../../inputs/interfaces/inputs';
import { apiUsers } from '../../../api/api-users';
import { apiSignIn } from '../../../api/api-sign-in';
import { StatusCode } from '../../../api/api-interfaces';

export class FormRegistration extends Form implements IForm {
  private readonly email: IInputBaseElement;

  private readonly password: IInputBaseElement;

  private readonly name: IInputBaseElement;

  constructor() {
    super();
    this.email = new InputEmail();
    this.password = new InputPassword();
    this.name = new InputName();
    const confirmPass = new InputConfirmPassword(this.password);
    this.validateElementContainer.push(this.email, this.password, this.name, confirmPass);
    this.htmlButtonSubmit.textContent = 'Зарегистрироваться';
    this.element.append(
      new BaseElement('div', 'form__title', 'Заргистрируйся в RSLang!!!').element,
      new BaseElement(
        'div',
        'form__todo',
        '... и изучай английский вместе с нами',
      ).element,
      this.email.element,
      this.name.element,
      this.password.element,
      confirmPass.element,
      this.htmlButtonSubmit,
    );
    this.htmlButtonSubmit.addEventListener('click', (event) => this.buttonHandler(event));
  }

  private buttonHandler(event: Event): void {
    event.preventDefault();
    if (this.isValid()) {
      apiUsers.createANewUser(
        this.name.getValue(),
        this.email.getValue(),
        this.password.getValue(),
      ).then((resultCreate) => {
        switch (resultCreate.statusCode) {
          case StatusCode.Success:
            apiSignIn.signIn(this.email.getValue(), this.password.getValue())
              .then((resultAuth) => {
                if (resultAuth.statusCode !== StatusCode.Success) {
                  this.drawInfoMessage(FormErrorMsg.notValidEmailPassword);
                } else {
                  localStorage.setItem('auth', JSON.stringify(resultAuth.body));
                  // TODO redirect to Router!!!
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
