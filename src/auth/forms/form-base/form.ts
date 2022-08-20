import { IForm } from '../interfaces/forms';
import { IInputBaseElement } from '../../inputs/interfaces/inputs';
import { BaseElement } from '../../../utils/base-element/base-element';
import './form.scss';

export class Form implements IForm {
  protected readonly validateElementContainer: IInputBaseElement[];

  protected readonly htmlContainer: HTMLFormElement;

  protected readonly htmlButtonSubmit: HTMLButtonElement;

  constructor() {
    this.validateElementContainer = [];
    this.htmlContainer = new BaseElement('form', 'form').element;
    this.htmlButtonSubmit = new BaseElement('button', 'form__button-submit').element;
  }

  public getHtmlTag(): HTMLFormElement {
    return this.htmlContainer;
  }

  public isValid(): boolean {
    return this.validateElementContainer.every((item) => item.validate());
  }

  protected drawInfoMessage(message: string): void {
    const infoMessage = new BaseElement(
      'div',
      'form-error-message',
      message,
    ).element;
    infoMessage.addEventListener('click', () => infoMessage.remove());
    this.htmlContainer.append(infoMessage);
  }
}
