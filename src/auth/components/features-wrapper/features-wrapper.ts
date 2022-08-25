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
    super('div', ['features-wrapper']);
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
    this.featuresContainer = new BaseComponent('div', ['app-feature-container']);

    this.textbookFeatures = new FeaturesContainerBase(
      'textbook',
      'Учебник',
      `https://images.prismic.io/
quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_
Home_Flashcards.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800`,
      'более 3500 слов для изучения, разбитых на разделы по уровню твоей подготовки',
    );

    this.dictionaryFeatures = new FeaturesContainerBase(
      'dictionary',
      'Словарь',
      `https://images.prismic.io/
quizlet-prod/33696601-f5ff-43e0-9144-f9e30eed4514_
Teacher+call+out.png?auto=compress,format&rect=0,2,3072,2395&w=1106&h=800`,
      'создай свой персональный словарь для изучения слов',
    );

    this.gamesFeatures = new FeaturesContainerBase(
      'games',
      'Игры',
      `https://images.prismic.io/quizlet-prod/
3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?
auto=compress,format&rect=0,2,3072,2395&w=1026&h=800`,
      'Увлекательные игры на развитие запоминания слов, восприятия на слух и письма',
    );

    this.statisticFeatures = new FeaturesContainerBase(
      'statistic',
      'Статистика',
      `https://images.prismic.io/quizlet-prod/
6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_
Home_MobileApp.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800`,
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
