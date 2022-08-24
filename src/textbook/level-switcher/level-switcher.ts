import { WordDifficultyGroup } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import { LevelButton } from '../level-button/level-button';
import {
  IPublisher,
  // IPublisherLevelButton,
  ISubscriber,
  ISubscriberLevelButton,
} from '../textbook-interfaces';
import './level-switcher.scss';

export class LevelSwitcher extends BaseElement<'div'>
  implements IPublisher, ISubscriberLevelButton {

  private currentLevel: LevelButton;

  private subscribers: ISubscriber[];

  private levelButtons: LevelButton[];

  constructor() {
    super('div', 'textbook__level-switcher');
    const levelArr = Object.values(WordDifficultyGroup).sort();
    this.subscribers = [];
    this.levelButtons = levelArr.map((level) => {
      const button = new LevelButton(level);
      button.register(this);
      this.element.append(button.element);
      return button;
    });
    this.currentLevel = this.levelButtons[0];
    this.currentLevel.element.classList.add('select');
    // for (let i = 0; i < levelArr.length; i += 1) {
    //   const button = new LevelButton(levelArr[i]);
    //   button.register(this);

    //   this.element.append(button.element);
    // }
  }

  update(publisher: LevelButton): void {
    this.currentLevel.element.classList.remove('select');
    this.currentLevel = publisher;
    this.currentLevel.element.classList.add('select');
    // publisher.element.
    this.notify();
  }

  register(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  unregister(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notify(): void {
    this.subscribers.forEach((subscriber => subscriber.update()));
  }

  getCurrentLevel(): WordDifficultyGroup {
    return this.currentLevel.level;
  }
}
