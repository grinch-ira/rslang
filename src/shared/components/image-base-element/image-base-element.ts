import { BaseComponent } from '../base-element/base-component';

export class ImageBaseElement extends BaseComponent {
  element: HTMLImageElement;

  constructor(className: string, src: string, alt: string) {
    super('img', [`${className}-image`]);

    this.element.src = src;
    this.element.alt = alt;
  }
}
