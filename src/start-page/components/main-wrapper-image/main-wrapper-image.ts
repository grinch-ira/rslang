import { BaseComponent } from '../../../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { ImageBaseElement } from '../../../shared/components/image-base-element/image-base-element';
import './main-wrapper-image.scss';

export class MainWrapperImage extends BaseComponent {
  private wrapperContentImage: ImageBaseElement;

  private wrapperContentTitle: BaseComponent;

  private wrapperContentLogIn: BaseComponent;

  private wrapperContentContainer: BaseComponent;

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
    this.wrapperContentLogIn.element.setAttribute('href', '#login');
    this.wrapperContentContainer = new BaseComponent('div', ['image-content-container']);
    this.element.appendChild(this.wrapperContentImage.element);
    this.wrapperContentContainer.element.appendChild(this.wrapperContentTitle.element);
    this.wrapperContentContainer.element.appendChild(this.wrapperContentLogIn.element);
    this.element.appendChild(this.wrapperContentContainer.element);
    //this.element.appendChild(this.wrapperContentLogIn.element);
  }
}
