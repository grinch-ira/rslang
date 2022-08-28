import { BASE_URL } from '../../../api/api-interfaces';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { AudioPlayer } from '../../../shared/components/audio-player/audio-player';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IPublisherWordList, ISubscriber } from '../../models/textbook-interfaces';
import './word-presenter.scss';

export class WordPresenter extends BaseComponent implements ISubscriber {
  player: AudioPlayer;

  constructor() {
    super('div', ['word-presenter']);
    this.player = new AudioPlayer();
  }

  update(pub: IPublisherWordList): void {
    const word = pub.currentCheckWord.word;
    this.player.addInPlaylist(
      this.makeURL(word.audio),
      this.makeURL(word.audioMeaning),
      this.makeURL(word.audioExample),
    );
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
    const buttonPlay = document.createElement('button');
    buttonPlay.classList.add('word-presenter__audio-button');
    this.player.setControlElement(buttonPlay);
    transcriptionContainer.append(transcription, buttonPlay);
    // Add buttons word manage
    const session = SessionSaver.getInstance();
    if (session.isActive) {
      const manageContainer = new BaseComponent(
        'div',
        ['word-presenter__manage-button-containner'],
      ).element;
      const buttonHard = document.createElement('button');
      buttonHard.classList.add('word-presenter__manage-button-hard');
      buttonHard.addEventListener('click', () => {

      });
    }


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

  private makeURL(link: string): string {
    return `${BASE_URL}/${link}`;
  }

  private userWordIsExist(): Promise<boolean> {
    apiUsersWords.getAUserWordById(session.userId, word.id, session.token)
        .then((response) => {
          if (response.statusCode === StatusCode.Success) {
            const options = response.body;
  }

  private putUserWordtoHard() {

  }
}
