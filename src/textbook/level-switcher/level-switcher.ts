import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisher, ISubscriber } from '../textbook-interfaces';
import './level-switcher.scss';

export class LevelSwitcher implements IPublisher {
  private readonly htmlContainer: HTMLDivElement;

  private currentLevel: number;

  private subscribers: ISubscriber[];

  constructor() {
    this.htmlContainer = new BaseElement('div', 'textbook__level-switcher').element;
    this.currentLevel = 0;
    this.subscribers = [];
    for (let i = 0; i < 6; i += 1) {
      const item = new BaseElement(
        'button',
        'textbook__level-button',
        `Level ${i + 1}`,
      ).element;
      item.addEventListener('click', () => {
        this.currentLevel = i;
        this.notify();
      });
      this.htmlContainer.append(item);
    }
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

  getHtmlTag(): HTMLDivElement {
    return this.htmlContainer;
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }
}
