import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { ImageBaseElement } from '../image-base-element/image-base-element';
import './main-wrapper-image.scss';

export class MainWrapperImage extends BaseComponent {
  private wrapperContentImage: ImageBaseElement;

  private wrapperContentTitle: BaseComponent;

  private wrapperContentLogIn: BaseComponent;

  constructor() {
    super('section', ['image-content-wrapper']);

    this.wrapperContentImage = new ImageBaseElement(
      'wrapper-main-content',
      '../../assets/main.jpg',
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
