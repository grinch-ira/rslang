import { apiWords } from '../api/api-words';
import { BaseElement } from '../utils/base-element/base-element';
import { LevelSwitcher } from './level-switcher/level-switcher';
import { WordsList } from './wordsList/words-list';

export class Textbook {
  htmlContoiner: HTMLDivElement;

  levelSwitcher: LevelSwitcher;

  wordList: WordsList;

  constructor() {
    this.htmlContoiner = new BaseElement('div').element;
    this.levelSwitcher = new LevelSwitcher(this.loadWords.bind(this));
    this.wordList = new WordsList(this.loadWords.bind(this));
    this.htmlContoiner.append(
      this.levelSwitcher.getHtmlTag(),
      this.wordList.getHtmlTag(),
    );
    this.loadWords();
  }

  loadWords(): void {
    apiWords.getAChunkOfWords(
      this.levelSwitcher.getCurrentLevel().toString(),
      this.wordList.getCurrentPage().toString(),
    ).then((result) => {
      if (result.statusCode === 200) {
        if (result.body) this.wordList.setWords(result.body);
      }
    });
  }

  getHtmlTag(): HTMLDivElement {
    return this.htmlContoiner;
  }
}