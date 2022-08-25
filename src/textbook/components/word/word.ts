import { IWord } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './word.scss';

export class Word extends BaseComponent {
  word: IWord;

  constructor(word: IWord) {
    super('div', ['word']);
    this.word = word;
    this.element.append(
      new BaseComponent('p', ['word__text'], word.word).element,
      new BaseComponent('p', ['word__translate'], word.wordTranslate).element,
    );
  }
}
