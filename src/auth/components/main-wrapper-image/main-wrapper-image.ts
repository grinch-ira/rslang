//import { HeaderLink } from '../../header/header-link-base/header-link-base';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { ImageBaseElement } from '../image-base-element/image-base-element';
import './main-wrapper-image.scss';

export class MainWrapperImage extends BaseComponent {
  private wrapperContentImage: ImageBaseElement;

  private wrapperContentTitle: BaseComponent;

  private wrapperContentLogIn: BaseComponent;

  constructor() {
    super('div', ['image-content-wrapper']);

    this.wrapperContentImage = new ImageBaseElement(
      'wrapper-main-content',
      `https://images.prismic.io/
quizlet-prod/eca927aa-4f86-4e40-9565-8dd2fefb2cde_
hero+image+shaded.png?auto=compress,format`,
    );

    this.wrapperContentTitle = new BaseComponent(
      'p',
      ['wrapper-image-content-title'],
      'Достигайте лучших возможных результатов',
    );

    this.wrapperContentLogIn = new BaseComponent(
      'a', ['header-link-wrapper-login'], 'Вход');
    this.wrapperContentLogIn.element.setAttribute('href', '#');
    this.element.appendChild(this.wrapperContentImage.element);
    this.element.appendChild(this.wrapperContentTitle.element);
    this.element.appendChild(this.wrapperContentLogIn.element);
  }
}
