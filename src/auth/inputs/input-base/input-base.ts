import { IInputBaseElement } from '../interfaces/inputs';
import './input-base.scss';
import { BaseElement } from '../../../utils/basic-element/base-element';

export class InputBaseElement implements IInputBaseElement {
  private htmlElementContainer: HTMLDivElement;

  private compareRegExp: [RegExp, string][];

  private value: string;

  private infoLabel: HTMLDivElement;

  constructor(type: string, placeholder: string, compareRegExp: [RegExp, string][]) {
    this.compareRegExp = compareRegExp;
    const input = new BaseElement('input', 'field__input').element;
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('spellcheck', 'false');
    input.addEventListener('input', (event) => this.handler(event));
    input.addEventListener('blur', (event) => this.handler(event));
    input.addEventListener('focus', (event) => this.handler(event));
    const field = new BaseElement('div', 'field', input).element;
    field.addEventListener('click', () => input.focus());
    this.infoLabel = new BaseElement('div', 'info-label').element;
    this.htmlElementContainer = new BaseElement(
      'div',
      'field-container',
      [field, this.infoLabel]).element;
    this.value = '';
  }

  public validate(): boolean {
    return this.compareRegExp.every(([checkRegExp, message]) => {
      if (this.value.match(checkRegExp)) {
        return true;
      }
      this.drawErrorMessage(message);
      return false;
    });
  }

  public getHtmlTag(): HTMLDivElement {
    return this.htmlElementContainer;
  }

  private drawErrorMessage(message: string): void {
    this.infoLabel.textContent = message;
  }

  private handler(e: Event | undefined) {
    if (e) {
      switch (e.type) {
        case 'blur':
          if (this.validate()) {
            this.htmlElementContainer.classList.remove('invalid');
            this.htmlElementContainer.classList.add('valid');
            this.drawErrorMessage('Отлично ;)))');
          } else {
            this.htmlElementContainer.classList.remove('valid');
            this.htmlElementContainer.classList.add('invalid');
          }
          break;
        case 'input':
          this.value = (e.target as HTMLInputElement).value;
          break;
        case 'focus':
          this.htmlElementContainer.classList.remove('valid');
          this.htmlElementContainer.classList.remove('invalid');
          this.drawErrorMessage('');
      }
    }
  }
}
