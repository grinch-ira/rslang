import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { FormAuthorization } from '../form-authorization/form-authorization';
import { FormRegistration } from '../form-registration/form-registration';
import './form-login.scss';

export class FormLogin extends BaseComponent {
  private htmlFormContainer: HTMLElement;

  constructor() {
    super('div', ['authorization-container']);
    this.htmlFormContainer = new BaseComponent('main', ['main']).element;
    const header = new BaseComponent( 'header', ['header']).element;
    const logo = new BaseComponent('h1', ['logo'], 'RSLang').element;
    const footer = new BaseComponent('footer', ['footer']).element;
    header.append(logo);
    this.element.append(header, this.htmlFormContainer, footer);
    this.selectAuthorization();
  }

  private selectAuthorization(): void {
    const link = document.createElement('a');
    link.classList.add('link-to-next-form');
    link.innerText = 'зарегистрируйся';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectRegistration();
    });
    this.htmlFormContainer.innerHTML = '';
    const subText = new BaseComponent('div', ['form__subtext']).element;
    subText.append(
      new BaseComponent('span', [], 'Ещё не с нами? Тогда ').element,
      link,
    );
    this.htmlFormContainer.append(new FormAuthorization().element, subText);
  }

  private selectRegistration(): void {
    const link = new BaseComponent('a', ['link-to-next-form'], 'Да, войти!').element;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectAuthorization();
    });
    this.htmlFormContainer.innerHTML = '';
    const subText = new BaseComponent('div', ['form__subtext']).element;
    subText.append(
      new BaseComponent('span', [], 'Уже есть аккаунт? ').element,
      link,
    );
    this.htmlFormContainer.append(new FormRegistration().element, subText);
  }

}
