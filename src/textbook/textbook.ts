import { apiWords } from '../api/api-words';
import { BaseElement } from '../utils/base-element/base-element';
import { LevelSwitcher } from './level-switcher/level-switcher';
import { PageSwitcher } from './page-switcher/page-switcher';
import { ISubscriber } from './textbook-interfaces';
import { WordPresenter } from './word-presenter/word-presenter';
import { WordsList } from './words-list/words-list';
import './textbook.scss';
import { StatusCode } from '../api/api-interfaces';

export class Textbook extends BaseElement<'div'> implements ISubscriber {
  private levelSwitcher: LevelSwitcher;

  private pageSwitcher: PageSwitcher;

  private wordList: WordsList;

  private wordPresenter: WordPresenter;

  constructor() {
    super('div', 'textbook');
    this.levelSwitcher = new LevelSwitcher();
    this.levelSwitcher.register(this);

    this.wordList = new WordsList();

    this.wordPresenter = new WordPresenter();
    this.wordList.register(this.wordPresenter);

    this.pageSwitcher = new PageSwitcher(30);
    this.pageSwitcher.register(this);

    this.element.append(
      this.levelSwitcher.element,
      new BaseElement('div', 'textbook__word-cascade', [
        this.wordList.element,
        this.wordPresenter.element,
      ]).element,
      this.pageSwitcher.element,
    );
    this.loadWords();
  }

  public update(): void {
    this.loadWords();
  }

  private loadWords(): void {
    apiWords.getAChunkOfWords(
      this.levelSwitcher.getCurrentLevel(),
      this.pageSwitcher.getCurrentPage().toString(),
    ).then((result) => {
      if (result.statusCode === StatusCode.Success) {
        if (result.body) this.wordList.setWords(result.body);
      }
    });
  }
}
