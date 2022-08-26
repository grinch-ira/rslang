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

    const transcriptionContainer = new BaseComponent(
      'div',
      ['word-presenter__transcription-container']).element;


    const transcription = new BaseComponent(
      'p',
      ['word-presenter__transcription'],
    ).element;
    transcription.innerHTML = word.transcription;

    transcriptionContainer.append(transcription, this.getButtonAudioPlay());

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
      transcriptionContainer,
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

  private getPlayIcon(isPlay: boolean): string {
    // eslint-disable-next-line max-len
    return isPlay ? '<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="darkgreen"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/><path d="M23,12a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V13A1,1,0,0,0,23,12Z"/><path d="M26,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,26,10Z"/><path d="M29,8a1,1,0,0,0-1,1V23a1,1,0,0,0,2,0V9A1,1,0,0,0,29,8Z"/></g></svg>'
    // eslint-disable-next-line max-len
      : '<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="darkgrey"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/></g></svg>';
  }

  private getButtonAudioPlay(): HTMLButtonElement {
    const buttonAudio = new BaseComponent(
      'button',
      ['word-presenter__audio-button'],
    ).element as HTMLButtonElement;
    buttonAudio.innerHTML = this.getPlayIcon(false);
    return buttonAudio;
  }
}
