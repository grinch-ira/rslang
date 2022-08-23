import { HeaderLink } from '../../header/header-link-base/header-link-base';
import { BaseElement } from '../../../utils/base-element/base-element';
import { ImageBaseElement } from '../image-base-element/image-base-element';
import './main-wrapper-image.scss';

export class MainWrapperImage extends BaseElement<'div'> {
  private wrapperContentImage: ImageBaseElement;

  private wrapperContentTitle: BaseElement<'p'>;

  private wrapperContentLogIn: HeaderLink;

  constructor() {
    super('div', 'image-content-wrapper');

    this.wrapperContentImage = new ImageBaseElement(
      'wrapper-main-content',
      `https://images.prismic.io/
quizlet-prod/eca927aa-4f86-4e40-9565-8dd2fefb2cde_
hero+image+shaded.png?auto=compress,format`,
    );

    this.wrapperContentTitle = new BaseElement(
      'p',
      'wrapper-image-content-title',
      'Достигайте лучших возможных результатов',
    );

    this.wrapperContentLogIn = new HeaderLink('Вход', 'wrapper-login');
    this.wrapperContentLogIn.element.href = '#';
    this.element.appendChild(this.wrapperContentImage.element);
    this.element.appendChild(this.wrapperContentTitle.element);
    this.element.appendChild(this.wrapperContentLogIn.element);
  }
}
