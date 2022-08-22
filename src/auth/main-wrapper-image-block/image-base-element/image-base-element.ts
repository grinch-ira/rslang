import { BaseElement } from '../../../utils/base-element/base-element';
export class ImageBaseElement {
  element: HTMLImageElement;

  constructor(className: string, src: string) {
    this.element = new BaseElement('img', `${className}-image`).element;
    this.element.src = src;
  }
}
