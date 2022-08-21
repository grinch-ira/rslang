import { apiWords } from '../api/api-words';
import { BaseElement } from '../utils/base-element/base-element';
import { LevelSwitcher } from './level-switcher/level-switcher';
import { ISubscriber } from './textbook-interfaces';
import { WordsList } from './wordsList/words-list';

export class Textbook implements ISubscriber {
  private readonly htmlContoiner: HTMLDivElement;

  private levelSwitcher: LevelSwitcher;

  private wordList: WordsList;

  constructor() {
    this.htmlContoiner = new BaseElement('div').element;
    this.levelSwitcher = new LevelSwitcher();
    this.levelSwitcher.register(this);
    this.wordList = new WordsList();
    this.wordList.register(this);
    this.htmlContoiner.append(
      this.levelSwitcher.getHtmlTag(),
      this.wordList.getHtmlTag(),
    );
    this.loadWords();
  }

  public update(): void {
    this.loadWords();
  }

  private loadWords(): void {
    apiWords.getAChunkOfWords(
      this.levelSwitcher.getCurrentLevel().toString(),
      this.wordList.getCurrentPage().toString(),
    ).then((result) => {
      if (result.statusCode === 200) {
        if (result.body) this.wordList.setWords(result.body);
      }
    });
  }

  public getHtmlTag(): HTMLDivElement {
    return this.htmlContoiner;
  }
}
