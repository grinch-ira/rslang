import { IWord } from '../../api/api_interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisher, ISubscriber } from '../textbook-interfaces';
import './words-list.scss';

export class WordsList implements IPublisher {
  private readonly htmlContainer: HTMLDivElement;

  private readonly htmlWordsContainer: HTMLDivElement;

  private readonly htmlPageSwitcherContainer: HTMLDivElement;

  private wordsArray: IWord[];

  private currentPage: number;

  private subscribers: ISubscriber[];

  constructor(pageNumber = 0) {
    this.currentPage = pageNumber;
    this.subscribers = [];
    this.htmlContainer = new BaseElement('div', 'textbook__words-list').element;
    this.htmlWordsContainer = new BaseElement('div', 'textbook__words-container').element;
    this.htmlPageSwitcherContainer = new BaseElement(
      'div',
      'textbook__page-switcher',
    ).element;
    this.initPageSwitcher();
    this.htmlContainer.append(
      this.htmlWordsContainer,
      this.htmlPageSwitcherContainer,
    );
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

  getHtmlTag(): HTMLDivElement {
    return this.htmlContainer;
  }

  setWords(words: IWord[]): void {
    this.wordsArray = words;
    this.listRefresh();
  }

  listRefresh(): void {
    this.htmlWordsContainer.innerHTML = '';
    this.wordsArray.forEach((word) => {
      const wordTag = new BaseElement('div', 'textbook__word', word.word).element;
      this.htmlWordsContainer.append(wordTag);
    });
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
      this.htmlPageSwitcherContainer.append(pageButton);
    }
  }
}
