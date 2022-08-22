import { IWord } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import './word.scss';

export class Word extends BaseElement<'div'> {
  id: string;

  constructor({ id, word, wordTranslate }: IWord) {
    super('div', 'word');
    this.id = id;
    this.element.append(
      new BaseElement('p', 'word__text', word).element,
      new BaseElement('p', 'word__translate', wordTranslate).element,
    );
  }
}
