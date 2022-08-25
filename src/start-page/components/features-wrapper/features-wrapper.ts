import { BaseComponent } from '../../../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { FeaturesContainerBase } from '../app-features-img-container-base/app-features-img-container-base';
import './features-wrapper.scss';

export class FeaturesWrapper extends BaseComponent {
  private applicationFeaturesTitle: BaseComponent;

  private applicationFeaturesSubtitle: BaseComponent;

  private textbookFeatures: FeaturesContainerBase;

  private dictionaryFeatures: FeaturesContainerBase;

  private gamesFeatures: FeaturesContainerBase;

  private statisticFeatures: FeaturesContainerBase;

  private featuresContainer: BaseComponent;

  constructor() {
    super('section', ['features-wrapper']);
    this.applicationFeaturesTitle = new BaseComponent(
      'div',
      ['application-features-title'],
      'Ваш следующий успех - не за горами',
    );

    this.applicationFeaturesSubtitle = new BaseComponent(
      'div',
      ['application-features-subtitle'],
      'чтобы стать к нему чуть-чуть ближе, ознакомтесь с возможностями приложения',
    );
    this.featuresContainer = new BaseComponent('div', [
      'app-feature-container',
    ]);

    this.textbookFeatures = new FeaturesContainerBase(
      'textbook',
      'Учебник',
      '../../assets/textbook.jpg',
      'Более 3500 слов для изучения, разбитых на разделы по уровню твоей подготовки',
    );

    this.dictionaryFeatures = new FeaturesContainerBase(
      'dictionary',
      'Словарь',
      '../../assets/dictionary.jpg',
      'Создай свой персональный словарь для изучения слов',
    );

    this.gamesFeatures = new FeaturesContainerBase(
      'games',
      'Игры',
      '../../assets/game.jpg',
      'Увлекательные игры на развитие запоминания слов, восприятия на слух и письма',
    );

    this.statisticFeatures = new FeaturesContainerBase(
      'statistic',
      'Статистика',
      '../../assets/statisctic.jpg',
      'Отслеживай свой прогресс в индивидуальной статистике!',
    );

    this.element.appendChild(this.applicationFeaturesTitle.element);
    this.element.appendChild(this.applicationFeaturesSubtitle.element);
    this.element.appendChild(this.featuresContainer.element);
    this.featuresContainer.element.appendChild(this.textbookFeatures.element);
    this.featuresContainer.element.appendChild(this.dictionaryFeatures.element);
    this.featuresContainer.element.appendChild(this.gamesFeatures.element);
    this.featuresContainer.element.appendChild(this.statisticFeatures.element);
  }
}
