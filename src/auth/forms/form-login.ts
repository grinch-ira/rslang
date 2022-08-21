import { BaseElement } from '../../utils/base-element/base-element';
import { FormAutorization } from './form-autorization/form-autorization';
import { FormRegistration } from './form-registration/form-registration';
import './form-login.scss';

export class FormLogin {
  private readonly htmlContainer: HTMLDivElement;

  private htmlFormContainer: HTMLElement;

  constructor() {
    this.htmlFormContainer = new BaseElement('main').element;
    this.htmlContainer = new BaseElement('div', 'autorization-container', [
      new BaseElement(
        'header',
        'header',
        new BaseElement('h1', 'logo', 'RSLang').element,
      ).element,
      this.htmlFormContainer,
      new BaseElement('footer').element,
    ]).element;
    this.selectAutorization();
  }

  public getHtmlTag(): HTMLDivElement {
    return this.htmlContainer;
  }

  private selectAutorization(): void {
    const link = new BaseElement('a', 'link-to-next-form', 'зарегистрируйся').element;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectRegistration();
    });
    this.htmlFormContainer.innerHTML = '';
    this.htmlFormContainer.append(
      new FormAutorization().getHtmlTag(),
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
      new FormRegistration().getHtmlTag(),
      new BaseElement('div', 'form__subtext', [
        new BaseElement('span', '', 'Уже есть аккаунт? ').element,
        link,
      ]).element,
    );
  }

}
