import { WordDifficultyGroup } from '../../../api/api-interfaces';
import { LevelButton } from '../level-button/level-button';
import {
  IPublisher,
  ISubscriber,
  ISubscriberLevelButton,
} from '../../models/textbook-interfaces';
import './level-switcher.scss';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';

export class LevelSwitcher extends BaseComponent
  implements IPublisher, ISubscriberLevelButton {

  private currentLevel: LevelButton;

  private subscribers: ISubscriber[];

  private levelButtons: LevelButton[];

  constructor() {
    super('div', ['textbook__level-switcher']);
    let levelArr = Object.values(WordDifficultyGroup).sort();

    if (!SessionSaver.getInstance().isActive) {
      levelArr = levelArr.filter((item) => +item < 6);
    }

    this.subscribers = [];
    this.levelButtons = levelArr.map((level) => {
      const button = new LevelButton(level);
      button.register(this);
      this.element.append(button.element);
      return button;
    });
    this.currentLevel = this.levelButtons[0];
    this.currentLevel.element.classList.add('select');
  }

  update(publisher: LevelButton): void {
    this.currentLevel.element.classList.remove('select');
    this.currentLevel = publisher;
    this.currentLevel.element.classList.add('select');
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
