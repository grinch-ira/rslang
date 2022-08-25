import { BASE_URL } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IPublisherWordList, ISubscriber } from '../../models/textbook-interfaces';
import './word-presenter.scss';

export class WordPresenter extends BaseComponent implements ISubscriber {

  constructor() {
    super('div', ['word-presenter']);
  }

  update(pub: IPublisherWordList): void {
    const word = pub.currentCheckWord.word;
    const image = new BaseComponent('img', ['word-presenter__image']).element;
    image.setAttribute('src', `${BASE_URL}/${word.image}`);
    const description = new BaseComponent('div', ['word-presenter__description']).element;

    const wordText = new BaseComponent('p', ['word-presenter__word']).element;
    wordText.innerHTML = word.word;
    const translate = new BaseComponent('p', ['word-presenter__translate']).element;
    translate.innerHTML = word.wordTranslate;
    const transcription = new BaseComponent(
      'p',
      ['word-presenter__transcription'],
    ).element;
    transcription.innerHTML = word.transcription;
    const meaning = new BaseComponent('p', ['word-presenter__meaning']).element;
    meaning.innerHTML = word.textMeaning;
    const meaningTranslate = new BaseComponent(
      'p',
      ['word-presenter__meaning-translate'],
    ).element;
    meaningTranslate.innerHTML = word.textMeaningTranslate;
    const example = new BaseComponent('p', ['word-presenter__example']).element;
    example.innerHTML = word.textExample;
    const exampleTranslate = new BaseComponent(
      'p',
      ['word-presenter__example-translate'],
    ).element;
    exampleTranslate.innerHTML = word.textExampleTranslate;

    description.append(
      wordText,
      translate,
      transcription,
      new BaseComponent('p', ['word-presenter__subheader'], 'Значение').element,
      meaning,
      meaningTranslate,
      new BaseComponent('p', ['word-presenter__subheader'], 'Пример').element,
      example,
      exampleTranslate,
    );

    this.element.innerHTML = '';
    this.element.append(
      image,
      description,
    );
  }
}
