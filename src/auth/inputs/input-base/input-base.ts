import { IInputBaseElement } from '../interfaces/inputs';
import './input-base.scss';
import { BaseElement } from '../../../utils/base-element/base-element';

export class InputBaseElement extends BaseElement<'div'> implements IInputBaseElement {
  private compareRegExp: [RegExp, string][];

  private value: string;

  private infoLabel: HTMLDivElement;

  constructor(type: string, placeholder: string, compareRegExp: [RegExp, string][]) {
    super('div', 'field-container');
    this.compareRegExp = compareRegExp;
    const input = new BaseElement('input', 'field__input').element;
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('spellcheck', 'false');
    input.addEventListener('input', (event) => this.handlerInput(event));
    input.addEventListener('blur', () => this.handlerBlur());
    input.addEventListener('focus', () => this.handlerFocus());
    const field = new BaseElement('div', 'field', input).element;
    field.addEventListener('click', () => input.focus());
    this.infoLabel = new BaseElement('div', 'info-label').element;
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
