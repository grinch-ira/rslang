import { BaseElement } from '../../../utils/base-element/base-element';
import { ImageBaseElement } from '../../main-wrapper-image-block/image-base-element/image-base-element';

export class FeaturesContainerBase extends BaseElement<'div'> {
  elementWrapper: BaseElement<'div'>;

  imageContainer: ImageBaseElement;

  textContainer: BaseElement<'div'>;

  constructor(className: string, title: string, src: string, subtitle: string) {
    super('div', `app-feature-${className}`);

    this.imageContainer = new ImageBaseElement(
      `app-feature-img-${className}`,
      src,
    );
    this.textContainer = new BaseElement(
      'div',
      `app-feature-text-${className}`,
      `${title} <br><span> ${subtitle} </span>`,
    );

    this.element.appendChild(this.imageContainer.element);
    this.element.appendChild(this.textContainer.element);
  }
}
