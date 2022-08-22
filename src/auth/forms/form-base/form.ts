import { IForm } from '../interfaces/forms';
import { IInputBaseElement } from '../../inputs/interfaces/inputs';
import { BaseElement } from '../../../utils/base-element/base-element';
import './form.scss';

export class Form extends BaseElement<'form'> implements IForm {
  protected readonly validateElementContainer: IInputBaseElement[];

  protected readonly htmlButtonSubmit: HTMLButtonElement;

  constructor() {
    super('form', 'form');
    this.validateElementContainer = [];
    this.htmlButtonSubmit = new BaseElement('button', 'form__button-submit').element;
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
    this.element.append(infoMessage);
  }
}
