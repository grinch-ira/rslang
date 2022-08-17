import { IForm } from './interfaces/forms';
import { IInputElement } from '../inputs/interfaces/input-element';
// import { InputElement } from './input-element';

export class Form implements IForm {
  protected validateElementContainer: IInputElement[];


  // private htmlContainer: HTMLDivElement;

  constructor() {
    this.validateElementContainer = [];

  }

  public setParent(element: HTMLElement) {
    element.append(...this.validateElementContainer.map((item) => item.getHtmlTag()));
  }

  public isValid(): boolean {
    return this.validateElementContainer
      .reduce((reducer, item) => reducer && item.validate(), true);
  }
}
