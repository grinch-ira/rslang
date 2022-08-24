import { BaseElement } from '../../../utils/base-element/base-element';
import { DevelopersContainerBase } from '../developers-base/developers-base';
import './developers-wrapper.scss';

export class DevelopersWrapper extends BaseElement<'div'> {

  private aboutDeveloperTitle: BaseElement<'div'>;

  private developerAnton: DevelopersContainerBase;

  private developerVladimir: DevelopersContainerBase;

  private developerIryna: DevelopersContainerBase;


  private developerContainer: BaseElement<'div'>;

  constructor() {
    super('div', 'about-developers-wrapper');

    this.developerContainer = new BaseElement('div', 'developers-container');

    this.aboutDeveloperTitle = new BaseElement(
      'div',
      'about-developer-title',
      'О разработчиках',
    );

    this.developerAnton = new DevelopersContainerBase(
      'anton about-dev',
      '<a href = "https://github.com/mldx" target = "_blank">Anton</a>',
      '../../assets/anton.jpg',      
      'я люблю пиво',
    );

    this.developerVladimir = new DevelopersContainerBase(
      'vladimir about-dev',
      '<a href = "https://github.com/dyexplode" target = "_blank">Vladimir</a>',
      `https://images.prismic.io/
quizlet-prod/33696601-f5ff-43e0-9144-f9e30eed4514_
Teacher+call+out.png?auto=compress,format&rect=0,2,3072,2395&w=1106&h=800`,
      'я тоже люблю пиво',
    );

    this.developerIryna = new DevelopersContainerBase(
      'iryna about-dev',
      '<a href = "https://github.com/grinch-ira" target = "_blank">Iryna</a>',
      '../../assets/iryna.jpg',
      'пииииво:)',
    );

    this.element.appendChild(this.aboutDeveloperTitle.element);
    this.element.appendChild(this.developerContainer.element);
    this.developerContainer.element.appendChild(this.developerAnton.element);
    this.developerContainer.element.appendChild(this.developerVladimir.element);
    this.developerContainer.element.appendChild(this.developerIryna.element);
  }
}
