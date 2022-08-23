import { BaseElement } from '../../../utils/base-element/base-element';
import { ImageBaseElement } from '../../main-wrapper-image-block/image-base-element/image-base-element';

export class DevelopersContainerBase extends BaseElement<'div'> {
  elementWrapper: BaseElement<'div'>;

  imageContainer: ImageBaseElement;

  textContainer: BaseElement<'div'>;

  constructor(className: string, title: string, src: string, subtitle: string) {
    super('div', `developer-${className}`);

    this.imageContainer = new ImageBaseElement(
      `developer-img-${className}`,
      src,
    );
    this.textContainer = new BaseElement(
      'div',
      `developer-subtitle-${className}`,
      `${title} <br><span> ${subtitle} </span>`,
    );

    this.element.appendChild(this.imageContainer.element);
    this.element.appendChild(this.textContainer.element);
  }
}
