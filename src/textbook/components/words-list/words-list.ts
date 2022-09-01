import { IWord } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IPublisher, ISubscriber } from '../../models/textbook-interfaces';
import { Word } from '../word/word';
import './words-list.scss';

export class WordsList extends BaseComponent implements IPublisher {
  private wordsArray: Word[];

  private subscribers: ISubscriber[];

  public currentCheckWord: Word;

  constructor() {
    super('div', ['textbook__words-list']);
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
    this.wordsArray = words.map((word) => new Word(word));
    this.listRefresh();
  }

  listRefresh(): void {
    this.element.innerHTML = '';
    this.wordsArray.forEach((word) => {
      word.element.addEventListener('click', () => {
        this.currentCheckWord.element.classList.remove('select');
        this.currentCheckWord = word;
        this.currentCheckWord.element.classList.add('select');
        this.notify();
      });
      this.element.append(word.element);
    });

    if (this.wordsArray.length) {
      this.currentCheckWord = this.wordsArray[0];
      this.currentCheckWord.element.classList.add('select');
      this.notify();
    }
  }

  drawEmpty() {
    this.element.innerHTML = '';
    const emptyContainer = new BaseComponent(
      'div',
      ['textbook__empty_message'],
    ).element;
    emptyContainer.innerHTML = `На  данный момент в данной категории ничего нет.
    <br>Продолжайте обучение...`;
    this.element.append(emptyContainer);
  }
}
