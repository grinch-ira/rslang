import { BaseElement } from '../../../utils/base-element/base-element';
import { FormAutorization } from '../form-authorization/form-authorization';
import { FormRegistration } from '../form-registration/form-registration';
import './form-login.scss';

export class FormLogin extends BaseElement<'div'> {
  private htmlFormContainer: HTMLElement;

  constructor() {
    super('div', 'authorization-container');
    this.htmlFormContainer = new BaseElement('main', 'main').element;
    this.element.append(
      new BaseElement(
        'header',
        'header',
        new BaseElement('h1', 'logo', 'RSLang').element,
      ).element,
      this.htmlFormContainer,
      new BaseElement('footer').element,
    );
    this.selectAutorization();
  }

  private selectAutorization(): void {
    const link = new BaseElement('a', 'link-to-next-form', 'зарегистрируйся').element;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectRegistration();
    });
    this.htmlFormContainer.innerHTML = '';
    this.htmlFormContainer.append(
      new FormAutorization().element,
      new BaseElement('div', 'form__subtext', [
        new BaseElement('span', '', 'Ещё не с нами? Тогда ').element,
        link,
      ]).element,
    );
  }

  private selectRegistration(): void {
    const link = new BaseElement('a', 'link-to-next-form', 'Да, войти!').element;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectAutorization();
    });
    this.htmlFormContainer.innerHTML = '';
    this.htmlFormContainer.append(
      new FormRegistration().element,
      new BaseElement('div', 'form__subtext', [
        new BaseElement('span', '', 'Уже есть аккаунт? ').element,
        link,
      ]).element,
    );
  }

}
