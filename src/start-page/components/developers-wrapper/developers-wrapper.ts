import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { DevelopersContainerBase } from '../developers-base/developers-base';
import './developers-wrapper.scss';

export class DevelopersWrapper extends BaseComponent {
  private aboutDeveloperTitle: BaseComponent;

  private developerAnton: DevelopersContainerBase;

  private developerVladimir: DevelopersContainerBase;

  private developerIryna: DevelopersContainerBase;

  private developerContainer: BaseComponent;

  constructor() {
    super('section', ['about-developers-wrapper']);

    this.developerContainer = new BaseComponent('div', [
      'developers-container',
    ]);

    this.aboutDeveloperTitle = new BaseComponent(
      'div',
      ['about-developer-title'],
      'О разработчиках',
    );

    this.developerAnton = new DevelopersContainerBase(
      'anton',
      'Anton | Junior front-end developer',
      './assets/anton.jpg',
      // eslint-disable-next-line max-len
      'Спустя 5 лет после универа понял, что всё-таки программирование это мое. Запросил все данные от сервера, которые только можно запросить, а так же написал игры спринт и аудиовызов',
      'https://github.com/mldx',
    );

    this.developerVladimir = new DevelopersContainerBase(
      'vladimir',
      'Vladimir | Junior front-end developer',
      './assets/vladimir.jpg',
      // eslint-disable-next-line max-len
      'Три недели получал удовольствие от командной работы и это было даже бесплатно. А ещё формы авторизации, учебник... и, может, ещё что - нибудь...',
      'https://github.com/dyexplode',
    );

    this.developerIryna = new DevelopersContainerBase(
      'iryna',
      'Iryna | Team lead | Junior front-end dev',
      './assets/iryna.jpg',
      'Стартовая страница, общий дизайн приложения и роутинг, что еще нужно для счастья?',
      'https://github.com/grinch-ira',
    );

    this.element.appendChild(this.aboutDeveloperTitle.element);
    this.element.appendChild(this.developerContainer.element);
    this.developerContainer.element.appendChild(this.developerAnton.element);
    this.developerContainer.element.appendChild(this.developerVladimir.element);
    this.developerContainer.element.appendChild(this.developerIryna.element);
  }
}
