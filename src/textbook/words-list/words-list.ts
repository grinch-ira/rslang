import { IWord } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisher, ISubscriber } from '../textbook-interfaces';
import { Word } from '../word/word';
import './words-list.scss';

export class WordsList extends BaseElement<'div'> implements IPublisher {
  // private readonly htmlWordsContainer: HTMLDivElement;

  private wordsArray: IWord[];

  private subscribers: ISubscriber[];

  public currentCheckWord: IWord;

  constructor() {
    super('div', 'textbook__words-list');
    this.subscribers = [];
  }

  public register(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  public unregister(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  public notify(): void {
    this.subscribers.forEach((subscriber) => subscriber.update(this));
  }

  setWords(words: IWord[]): void {
    this.wordsArray = words;
    this.listRefresh();
  }

  listRefresh(): void {
    this.element.innerHTML = '';
    this.wordsArray.forEach((word) => {
      //BaseElement('div', 'textbook__word', word.word).element;
      const wordTag = new Word(word).element;
      wordTag.addEventListener('click', () => {
        this.currentCheckWord = word;
        this.notify();
      });
      this.element.append(wordTag);
    });
    // console.log(this.wordsArray);
    if (this.wordsArray.length) {
      this.currentCheckWord = this.wordsArray[0];
      this.notify();
    }
  }
}
