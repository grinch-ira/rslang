import { Form } from '../form-base/form';
import { BaseElement } from '../../../shared/components/base-element/base-element';
import { FormErrorMsg, IForm } from '../../models/forms';
import {
  FieldPlaceholder, FieldValidateError, IInputBaseElement } from '../../models/inputs';
import { apiUsers } from '../../../api/api-users';
import { apiSignIn } from '../../../api/api-sign-in';
import { StatusCode } from '../../../api/api-interfaces';
import { InputBaseElement } from '../../components';
import { EMAIL_REGEXP, NAME_REGEXP, PASSWORD_REGEXP } from '../../models';


class InputConfirmPassword extends InputBaseElement {
  private readonly currentPasswordField: IInputBaseElement;

  private currentCompare: [RegExp, string];

  constructor(passField: IInputBaseElement) {
    const currentPass: [RegExp, string] = [new RegExp(passField.getValue()),
      FieldValidateError.notEqualyPassword];
    super('password', FieldPlaceholder.enterConfirmPassword, [
      [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
      currentPass,
    ]);
    this.currentPasswordField = passField;
    this.currentCompare = currentPass;
    this.element.addEventListener('click', () => {
      this.currentCompare[0] = new RegExp('^' +
        this.currentPasswordField.getValue() + '$');
    });
    this.element.addEventListener('keyup', () => this.validate());
  }
}



export class FormRegistration extends Form implements IForm {
  private readonly email: IInputBaseElement;

  private readonly password: IInputBaseElement;

  private readonly name: IInputBaseElement;

  constructor() {
    super();
    this.email = new InputBaseElement('email', FieldPlaceholder.enterEmail, EMAIL_REGEXP);
    this.password = new InputBaseElement(
      'password',
      FieldPlaceholder.enterPassword,
      PASSWORD_REGEXP,
    );
    this.name = new InputBaseElement('text', FieldPlaceholder.enterName, NAME_REGEXP);
    const confirmPass = new InputConfirmPassword(this.password);
    this.validateElementContainer.push(this.email, this.password, this.name, confirmPass);
    this.htmlButtonSubmit.textContent = 'Зарегистрироваться';
    this.element.append(
      new BaseElement('div', 'form__title', 'Зарегистрируйся в RSLang!!!').element,
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
    if (this.isValid) {
      // TODO: use const
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


