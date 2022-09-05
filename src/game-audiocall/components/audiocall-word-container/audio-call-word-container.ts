import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IWord } from '../../../api/api-interfaces';
import { getRandomNumber } from '../../models/text';

export class AudioCallWordContainer extends BaseComponent {
  element: HTMLDivElement;

  wordPair: [IWord, string];

  constructor() {
    super('div', ['game-sprint__active-screen-word-container']);
  }

  setWordPair(wordData: IWord[]) {
    if (wordData.length !== 0) {
      const index = getRandomNumber(0, wordData.length - 1);
      const randomWord = wordData.splice(index, 1)[0];

      const randomAnswer = wordData.length
        ? [
          randomWord.wordTranslate,
          wordData[getRandomNumber(0, wordData.length - 1)].wordTranslate,
        ][getRandomNumber(0, 1)]
        : randomWord.wordTranslate;
      this.wordPair = [randomWord, randomAnswer];
    }
  }

  async renderWordPair() {
    this.element.innerHTML = '';
    this.element.innerHTML = `${this.wordPair[0].word} - ${this.wordPair[1]}`;
  }

  isCorrectAnswer() {
    return this.wordPair[0].wordTranslate === this.wordPair[1];
  }
}
