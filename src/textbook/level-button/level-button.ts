import { WordDifficultyGroup } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisherLevelButton, ISubscriber } from '../textbook-interfaces';
import './level-button.scss';

export class LevelButton extends BaseElement<'div'> implements IPublisherLevelButton {
  level: WordDifficultyGroup;

  subscribers: ISubscriber[];

  constructor(level: WordDifficultyGroup) {
    const levelTitle = Object.keys(WordDifficultyGroup).sort();
    // ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    super('div', 'level-button', [
      new BaseElement(
        'div',
        'level-button__label',
        (+level < 2) ? 'Easy' : (+level > 3) ? 'Hard' : 'Medium').element,
      new BaseElement('div', 'level-button__value', levelTitle[+level]).element,
    ]);

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
