import { apiWords } from '../../../api/api-words';
import { LevelSwitcher } from '../level-switcher/level-switcher';
import { PageSwitcher } from '../page-switcher/page-switcher';
import { ISubscriber } from '../../models/textbook-interfaces';
import { WordPresenter } from '../word-presenter/word-presenter';
import { WordsList } from '../words-list/words-list';
import './textbook.scss';
import { StatusCode } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class Textbook extends BaseComponent implements ISubscriber {
  private levelSwitcher: LevelSwitcher;

  private pageSwitcher: PageSwitcher;

  private wordList: WordsList;

  private wordPresenter: WordPresenter;

  constructor() {
    super('div', ['textbook']);
    this.levelSwitcher = new LevelSwitcher();
    this.levelSwitcher.register(this);

    this.wordList = new WordsList();

    this.wordPresenter = new WordPresenter();
    this.wordList.register(this.wordPresenter);

    this.pageSwitcher = new PageSwitcher(30);
    this.pageSwitcher.register(this);
    const wordCascade = new BaseComponent('div', ['textbook__word-cascade']).element;
    wordCascade.append(
      this.wordList.element,
      this.wordPresenter.element,
    );
    this.element.append(
      this.levelSwitcher.element,
      wordCascade,
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
