import { IWord } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import './word.scss';

export class Word extends BaseElement<'div'> {
  word: IWord;

  constructor(word: IWord) {
    super('div', 'word');
    this.word = word;
    this.element.append(
      new BaseElement('p', 'word__text', word.word).element,
      new BaseElement('p', 'word__translate', word.wordTranslate).element,
    );
  }
}
