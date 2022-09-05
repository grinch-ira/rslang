import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { BASE_URL, IWord, WordDifficultyGroup } from '../../../api/api-interfaces';
import { apiWords } from '../../../api/api-words';
import { getRandomNumber } from '../../models/text';
import './game-audiocall-active-screen.scss';
import { AudioPlayer } from '../../../shared/components/audio-player/audio-player';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';
import {
  GameAudiocallResultScreen,
} from '../game-audiocall-result-screen/game-audiocall-result-screen';
import {
  ImageBaseElement,
} from '../../../shared/components/image-base-element/image-base-element';


export class GameAudioCallActiveScreen extends BaseComponent {
  element: HTMLDivElement;

  player = new AudioPlayer();

  playButton = new ButtonBaseElement(['game-audiocall__play']);

  answerButton = new ButtonBaseElement(['game-audiocall__answer-button'], 'не знаю');

  currentAnswerSet: IWord[];

  currentAnswerContainer = new BaseComponent(
    'div',
    ['game-audiocall__current-answer-container'],
  );

  currentAnswerContainerArray: ButtonBaseElement[];

  currentWord: IWord;

  gameIsActive = true;

  rounds = 0;

  streakCount = 0;

  wordImg = new ImageBaseElement('game-audiocall__current-word', '', '');

  roundsWin = 0;

  wordsData: IWord[];

  wordsDataFixed: IWord[];

  resultGame: {
    correct: IWord[],
    mistake: IWord[]
  } = {
      correct: [],
      mistake: [],
    };

  constructor(private level: WordDifficultyGroup, private pageWords?: string) {
    super('div', ['game-audiocall__active-screen']);
    this.start();
    this.player.setControlElement(this.playButton.element);

    this.answerButton.element.addEventListener('click', async () => {
      if (this.wordDataIsEmpty() && this.answerButton.element.textContent === 'дальше') {
        this.sortResult();
        this.element.replaceWith(new GameAudiocallResultScreen(this.resultGame).element);
      } else {
        if (this.answerButton.element.textContent === 'дальше') {
          this.answerButton.element.textContent = 'не знаю';
          this.player.isPlaying = false;
          await this.setWordOnPlayButton();
          this.createCurrentAnswerSet();
          this.renderAnswerButtons();
        } else {
          this.wordImg.element.classList.remove('hidden');
          this.wordImg.element.classList.add('visible');
          this.answerButton.element.textContent = 'дальше';
          this.currentAnswerContainerArray.forEach(btn => {
            btn.element.disabled = true;
            if (btn.element.textContent === this.currentWord.wordTranslate) {
              btn.element.classList.add('correct-answer');
            }
          });
          this.resultGame.mistake.push(this.currentWord);
        }
      }
    });
  }

  wordDataIsEmpty() {
    return (this.wordsData !== undefined) && (this.wordsData.length === 0);
  }

  async getWordData() {
    if (this.pageWords) {
      const wordData = (await apiWords.getAChunkOfWords(this.level, this.pageWords)).body;
      if (wordData && +this.pageWords > -1) {
        this.wordsData = wordData;
        this.pageWords = (+this.pageWords - 1).toString();
      }
    } else {
      const page = getRandomNumber(0, 29).toString();
      const wordData = (await apiWords.getAChunkOfWords(this.level, page)).body;
      if (wordData) {
        this.wordsData = wordData;
      }
    }
  }

  renderAnswerButtons() {
    this.currentAnswerContainer.element.innerHTML = '';
    this.currentAnswerContainerArray = [];
    this.currentAnswerSet.forEach((word, index) => {

      const wordButton = new ButtonBaseElement(
        [`game-audiocall-current-answer-${index}`, 'current-answer-button'],
        `${word.wordTranslate}`,
      );

      this.currentAnswerContainerArray.push(wordButton);

      wordButton.element.addEventListener('click', () => {

        this.answerButton.element.textContent = 'дальше';

        this.wordImg.element.classList.remove('hidden');
        this.wordImg.element.classList.add('visible');

        this.currentAnswerContainerArray.forEach(btn => {
          btn.element.disabled = true;
          if (btn.element.textContent === this.currentWord.wordTranslate) {
            btn.element.classList.add('correct-answer');
          }
        });

        if (word.word !== this.currentWord.word) {
          wordButton.element.classList.add('incorrect-answer');
          this.resultGame.mistake.push(this.currentWord);
        } else {
          wordButton.element.classList.add('correct-answer');
          this.resultGame.correct.push(this.currentWord);
        }
      });

      this.currentAnswerContainer.element.append(
        wordButton.element,
      );
    });
  }

  sortResult() {
    this.resultGame.correct
      = this.resultGame.correct.sort((a, b) => a.word.localeCompare(b.word));
    this.resultGame.mistake
      = this.resultGame.mistake.sort((a, b) => a.word.localeCompare(b.word));
  }

  async setWordOnPlayButton() {
    if (this.wordsData && !this.player.isPlaying) {
      this.currentWord =
        this.wordsData.splice(getRandomNumber(0, this.wordsData.length - 1), 1)[0];
      await this.player
        .addInPlaylist(`${BASE_URL}/${this.currentWord.audio}`);
      this.wordImg.element.src = `${BASE_URL}/${this.currentWord.image}`;
      this.wordImg.element.alt = this.currentWord.word;
      this.wordImg.element.classList.add('hidden');
    }
  }

  setWordDataFixed() {
    this.wordsDataFixed = JSON.parse(JSON.stringify(this.wordsData));
  }

  createCurrentAnswerSet() {
    let data: IWord[] = JSON.parse(JSON.stringify(this.wordsDataFixed));
    data = data.filter(word => word.word !== this.currentWord.word);
    if (this.wordsData) {
      this.currentAnswerSet = [
        data.splice(getRandomNumber(0, data.length - 1), 1)[0],
        data.splice(getRandomNumber(0, data.length - 1), 1)[0],
        data.splice(getRandomNumber(0, data.length - 1), 1)[0],
        this.currentWord,
        data.splice(getRandomNumber(0, data.length - 1), 1)[0],
      ].sort(() => getRandomNumber(-10, 10));
    }
  }

  async start() {
    await this.getWordData();
    this.setWordDataFixed();
    await this.setWordOnPlayButton();
    this.createCurrentAnswerSet();
    this.renderAnswerButtons();

    await this.element.append(
      this.playButton.element,
      this.wordImg.element,
      this.currentAnswerContainer.element,
      this.answerButton.element,
    );
  }
}
