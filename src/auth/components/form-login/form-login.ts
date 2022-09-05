import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { FormAuthorization } from '../form-authorization/form-authorization';
import { FormRegistration } from '../form-registration/form-registration';
import './form-login.scss';

export class FormLogin extends BaseComponent {
  constructor() {
    super('div', ['authorization-container']);
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
    this.element.innerHTML = '';
    const subText = new BaseComponent('div', ['form__subtext']).element;
    subText.append(
      new BaseComponent('span', [], 'Ещё не с нами? Тогда ').element,
      link,
    );
    this.element.append(new FormAuthorization().element, subText);
  }

  private selectRegistration(): void {
    const link = new BaseComponent('a', ['link-to-next-form'], 'Да, войти!').element;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      this.selectAuthorization();
    });
    this.element.innerHTML = '';
    const subText = new BaseComponent('div', ['form__subtext']).element;
    subText.append(
      new BaseComponent('span', [], 'Уже есть аккаунт? ').element,
      link,
    );
    this.element.append(new FormRegistration().element, subText);
  }
}
