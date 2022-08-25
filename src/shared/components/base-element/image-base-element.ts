import { BaseComponent } from './base-component';

export class ImageBaseElement extends BaseComponent {
  element: HTMLImageElement;

  constructor(className: string, src: string) {
    super('img', [`${className}-image`]);
    
    this.element.src = src;
  }
}
