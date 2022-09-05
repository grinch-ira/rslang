import { BaseComponent } from '../../../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { ImageBaseElement } from '../../../shared/components/image-base-element/image-base-element';

export class FeaturesContainerBase extends BaseComponent {
  imageContainer: ImageBaseElement;

  title: BaseComponent;

  subtitle: BaseComponent;

  textContainer: BaseComponent;

  constructor(className: string, title: string, src: string, subtitle: string) {
    super('div', [`app-feature-${className}`]);

    this.imageContainer = new ImageBaseElement(
      `app-feature-${className}`,
      src,
      'app-feature',
    );
    this.title = new BaseComponent(
      'div',
      [`app-feature-title-${className}`],
      title,
    );

    this.subtitle = new BaseComponent(
      'div',
      [`app-feature-subtitle-${className}`],
      subtitle,
    );

    this.textContainer = new BaseComponent('div', ['text-container']);

    this.element.appendChild(this.imageContainer.element);
    this.textContainer.element.appendChild(this.title.element);
    this.textContainer.element.appendChild(this.subtitle.element);
    this.element.appendChild(this.textContainer.element);
  }
}
