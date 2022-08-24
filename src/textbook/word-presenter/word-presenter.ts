import { BASE_URL } from '../../api/api-interfaces';
import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisherWordList, ISubscriber } from '../textbook-interfaces';
import './word-presenter.scss';

export class WordPresenter extends BaseElement<'div'> implements ISubscriber {

  constructor() {
    super('div', 'word-presenter');
  }

  update(pub: IPublisherWordList): void {
    const word = pub.currentCheckWord.word;
    const image = new BaseElement('img', 'word-presenter__image').element;
    image.setAttribute('src', `${BASE_URL}/${word.image}`);
    this.element.innerHTML = '';
    this.element.append(
      image,
      new BaseElement('div', 'word-presenter__description', [
        new BaseElement('p', 'word-presenter__word', word.word).element,
        new BaseElement('p', 'word-presenter__translate', word.wordTranslate).element,
        new BaseElement('p', 'word-presenter__transcription', word.transcription).element,
        new BaseElement('p', 'word-presenter__subheader', 'Значение').element,
        new BaseElement('p', 'word-presenter__meaning', word.textMeaning).element,
        new BaseElement(
          'p',
          'word-presenter__meaning-translate',
          word.textMeaningTranslate,
        ).element,
        new BaseElement('p', 'word-presenter__subheader', 'Пример').element,
        new BaseElement('p', 'word-presenter__example', word.textExample).element,
        new BaseElement(
          'p',
          'word-presenter__example-translate',
          word.textExampleTranslate,
        ).element,
      ]).element,
    );
  }
}
