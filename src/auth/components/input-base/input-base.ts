import './input-base.scss';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { InputType } from '../../models';

export class InputBaseElement extends BaseComponent {
  element: HTMLDivElement;

  compareRegExp: [RegExp, string][];

  private value: string;

  private infoLabel: HTMLDivElement;

  constructor(type: InputType, placeholder: string, compareRegExp: [RegExp, string][]) {
    super('div', ['field-container']);
    this.compareRegExp = compareRegExp;
    const input = new BaseComponent('input', ['field__input']).element;
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('spellcheck', 'false');
    input.addEventListener('input', (event) => this.handlerInput(event));
    input.addEventListener('blur', () => this.handlerBlur());
    input.addEventListener('focus', () => this.handlerFocus());
    const field = new BaseComponent('div', ['field']).element;
    field.append(input);
    field.addEventListener('click', () => input.focus());
    this.infoLabel = new BaseComponent('div', ['info-label']).element as HTMLDivElement;
    this.element.append(field, this.infoLabel);
    this.value = '';
  }

  public validate(): boolean {
    const isValid = this.compareRegExp.every(([checkRegExp, message]) => {
      if (this.value.match(checkRegExp)) {
        return true;
      }
      this.drawErrorMessage(message);
      return false;
    });
    this.checkFieldState(isValid);
    return isValid;
  }

  public getValue(): string {
    return this.value;
  }

  private drawErrorMessage(message: string): void {
    this.infoLabel.textContent = message;
  }

  private checkFieldState(isValid: boolean): void {
    if (isValid) {
      this.element.classList.remove('invalid');
      this.element.classList.add('valid');
      this.drawErrorMessage('Отлично ;)))');
    } else {
      this.element.classList.remove('valid');
      this.element.classList.add('invalid');
    }
  }

  private handlerBlur() {
    this.validate();
  }

  private handlerFocus() {
    this.element.classList.remove('valid');
    this.element.classList.remove('invalid');
    this.drawErrorMessage('');
  }

  private handlerInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }
}
