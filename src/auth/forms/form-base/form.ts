import { IForm } from '../interfaces/forms';
import { IInputBaseElement } from '../../inputs/interfaces/inputs';

export class Form implements IForm {
  protected validateElementContainer: IInputBaseElement[];

  constructor() {
    this.validateElementContainer = [];
  }

  // public setParent(element: HTMLElement) {
  //   element.append(...this.validateElementContainer.map((item) => item.getHtmlTag()));
  // }

  public isValid(): boolean {
    return this.validateElementContainer.every((item) => item.validate());
  }
}
