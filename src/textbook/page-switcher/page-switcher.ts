import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisher, ISubscriber } from '../textbook-interfaces';
import './page-switcher.scss';

export class PageSwitcher extends BaseElement<'div'> implements IPublisher {
  private subscribers: ISubscriber[];

  private currentPage: number;

  constructor() {
    super('div', 'textbook__page-switcher');
    this.subscribers = [];
    this.currentPage = 0;
    this.initPageSwitcher();
  }

  public register(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  public unregister(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  public notify(): void {
    this.subscribers.forEach((subscriber) => subscriber.update());
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  initPageSwitcher(): void {
    for (let i = 0; i < 30; i += 1) {
      const pageButton = new BaseElement(
        'button',
        'textbook__page-button',
        `${ i + 1 }`).element;
      pageButton.addEventListener('click', () => {
        this.currentPage = i;
        this.notify();
      });
      this.element.append(pageButton);
    }
  }
}
