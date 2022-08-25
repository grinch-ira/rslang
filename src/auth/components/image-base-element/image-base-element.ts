import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class ImageBaseElement {
  element: HTMLImageElement;

  constructor(className: string, src: string) {
    this.element = new BaseComponent('img', [`${className}-image`])
      .element as HTMLImageElement;
    this.element.src = src;
  }
}
