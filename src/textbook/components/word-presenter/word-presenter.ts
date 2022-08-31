import { BASE_URL } from '../../../api/api-interfaces';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { AudioPlayer } from '../../../shared/components/audio-player/audio-player';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IPublisherWordList, ISubscriber } from '../../models/textbook-interfaces';
import { proxyApi } from '../proxy-api/proxy-api';
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
    const manageContainer = new BaseComponent(
      'div',
      ['word-presenter__manage-button-container'],
    ).element;

    if (session.isActive) {
      proxyApi.getAUserWordById(word.id).then((userOptions) => {
        const buttonHard = document.createElement('button');
        buttonHard.classList.add('word-presenter__button-hard');
        const buttonStudied = document.createElement('button');
        buttonStudied.classList.add('word-presenter__button-studied');
        if (userOptions) {
        // If word is inited later
          if (userOptions.isHard) {
          // If word already in HARD
            buttonHard.addEventListener('click', () => {
              userOptions.isHard = false;
              proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                pub.currentCheckWord.update();
                this.update(pub);
              });
            });
            buttonHard.textContent = 'Убрать из тяжелых';
            buttonStudied.addEventListener('click', () => {
              userOptions.isHard = false;
              userOptions.isStudied = true;
              proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                pub.currentCheckWord.update();
                this.update(pub);
              });
            });
            buttonStudied.textContent = 'Добавить в изученные';
          } else {
            // If word in STUDIED
            if (userOptions.isStudied) {
              buttonStudied.addEventListener('click', () => {
                userOptions.isHard = false;
                userOptions.isStudied = false;
                proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                  pub.currentCheckWord.update();
                  this.update(pub);
                });
              });
              buttonStudied.textContent = 'Убрать из изученных';
              buttonHard.addEventListener('click', () => {
                userOptions.isHard = true;
                userOptions.isStudied = false;
                proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                  pub.currentCheckWord.update();
                  this.update(pub);
                });
              });
              buttonHard.textContent = 'Добавить в тяжелые';
            } else {
              // If word not in HARD
              buttonHard.addEventListener('click', () => {
                userOptions.isHard = true;
                userOptions.isStudied = false;
                proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                  pub.currentCheckWord.update();
                  this.update(pub);
                });
              });
              buttonHard.textContent = 'Добавить в тяжелые';
              buttonStudied.addEventListener('click', () => {
                userOptions.isHard = false;
                userOptions.isStudied = true;
                proxyApi.updateAUserWord(word.id, userOptions).then(() => {
                  pub.currentCheckWord.update();
                  this.update(pub);
                });
              });
              buttonStudied.textContent = 'Добавить в изученные';
            }
          }
        } else {
          // If word is not inited
          buttonHard.addEventListener('click', () => {
            proxyApi.createAUserWord(word.id).then((result) => {
              result.isHard = true;
              proxyApi.updateAUserWord(word.id, result).then(() => {
                pub.currentCheckWord.update();
                this.update(pub);
              });
            });
          });
          buttonHard.textContent = 'Добавить в тяжелые';
          buttonStudied.addEventListener('click', () => {
            proxyApi.createAUserWord(word.id).then((result) => {
              result.isHard = false;
              result.isStudied = true;
              proxyApi.updateAUserWord(word.id, result).then(() => {
                pub.currentCheckWord.update();
                this.update(pub);
              });
            });
          });
          buttonStudied.textContent = 'Добавить в изученные';
        }
        manageContainer.append(buttonHard, buttonStudied);
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
      manageContainer,
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
}
