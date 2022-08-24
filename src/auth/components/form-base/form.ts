import { IForm } from '../../models/forms';
import { IInputBaseElement } from '../../models/inputs';
import './form.scss';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class Form extends BaseComponent implements IForm {
  element: HTMLFormElement;

  protected readonly validateElementContainer: IInputBaseElement[];

  protected readonly htmlButtonSubmit: HTMLButtonElement;

  constructor() {
    super('form', ['form']);
    this.validateElementContainer = [];
    this.htmlButtonSubmit = new BaseComponent('button', ['form__button-submit'])
      .element as HTMLButtonElement;
  }

  public get isValid(): boolean {
    return this.validateElementContainer.every((item) => item.validate());
  }

  protected drawInfoMessage(message: string): void {
    const infoMessage = new BaseComponent(
      'div',
      ['form-error-message'],
      message,
    ).element;
    infoMessage.addEventListener('click', () => infoMessage.remove());
    this.element.append(infoMessage);
  }
}
