import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class ImageBaseElement extends BaseComponent {
  element: HTMLImageElement;

  constructor(className: string, src: string) {
    super('div');
    this.element = new BaseComponent('img', [`${className}-image`])
      .element as HTMLImageElement;
    this.element.src = src;
  }
}
