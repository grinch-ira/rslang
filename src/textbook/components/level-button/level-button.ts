import { WordDifficultyGroup } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  IPublisherLevelButton,
  ISubscriber,
  TEXTBOOK_LEVEL_DESCRIPTION,
} from '../../models/textbook-interfaces';
import './level-button.scss';

export class LevelButton extends BaseComponent implements IPublisherLevelButton {
  level: WordDifficultyGroup;

  subscribers: ISubscriber[];

  constructor(level: WordDifficultyGroup) {
    const levelTitle = Object.keys(WordDifficultyGroup).sort();
    super('div', ['level-button', `level-${+level}`]);
    this.element.append(
      new BaseComponent(
        'div',
        ['level-button__label'],
        // (+level < 2) ? 'Easy' : (+level > 3) ? 'Hard' : 'Medium').element,
        TEXTBOOK_LEVEL_DESCRIPTION[+level],
      ).element,
      new BaseComponent('div', ['level-button__value'], levelTitle[+level]).element,
    );

    this.level = level;
    this.element.addEventListener('click', () => this.notify());
    this.subscribers = [];
  }

  register(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  unregister(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  notify(): void {
    this.subscribers.forEach((subscriber) => subscriber.update(this));
  }
}
