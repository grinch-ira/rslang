import { HeaderLink } from '../../header/header-link-base/header-link-base';
import { BaseElement } from '../../../utils/base-element/base-element';
import { ImageBaseElement } from '../image-base-element/image-base-element';
import './main-wrapper-image.scss';

export class MainWrapperImage extends BaseElement<'div'> {
  private WrapperContentImage: ImageBaseElement;

  private WrapperContentTitle: BaseElement<'p'>;

  private WrapperContentLogIn: HeaderLink;

  constructor() {
    super('div', 'image-content-wrapper');

    this.WrapperContentImage = new ImageBaseElement(
      'wrapper-main-content',
      `https://images.prismic.io/
quizlet-prod/eca927aa-4f86-4e40-9565-8dd2fefb2cde_
hero+image+shaded.png?auto=compress,format`,
    );

    this.WrapperContentTitle = new BaseElement(
      'p',
      'wrapper-image-content-title',
      'Достигайте лучших возможных результатов',
    );

    this.WrapperContentLogIn = new HeaderLink('Вход', 'wrapper-login');
    this.WrapperContentLogIn.element.href = '#';
    this.element.appendChild(this.WrapperContentImage.element);
    this.element.appendChild(this.WrapperContentTitle.element);
    this.element.appendChild(this.WrapperContentLogIn.element);
  }
}
