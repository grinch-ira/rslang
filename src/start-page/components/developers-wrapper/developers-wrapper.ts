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
      'Anton',
      '../../assets/anton.jpg',
      'я люблю пиво',
      'https://github.com/mldx',
    );

    this.developerVladimir = new DevelopersContainerBase(
      'vladimir',
      'Vladimir',
      '../../assets/vladimir.jpg',
      'я тоже люблю пиво',
      'https://github.com/dyexplode',
    );

    this.developerIryna = new DevelopersContainerBase(
      'iryna',
      'Iryna',
      '../../assets/iryna.jpg',
      'пииииво:)',
      'https://github.com/grinch-ira',
    );

    this.element.appendChild(this.aboutDeveloperTitle.element);
    this.element.appendChild(this.developerContainer.element);
    this.developerContainer.element.appendChild(this.developerAnton.element);
    this.developerContainer.element.appendChild(this.developerVladimir.element);
    this.developerContainer.element.appendChild(this.developerIryna.element);
  }
}
