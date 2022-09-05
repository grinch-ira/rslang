import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IWord, WordDifficultyGroup } from '../../../api/api-interfaces';
import { apiWords } from '../../../api/api-words';
import { getRandomNumber } from '../../models/text';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';
import './game-sprint-active-screen.scss';
import { SprintPoints } from '../sprint-points/sprint-points';
import { SprintWordContainer } from '../sprint-word-container/sprint-word-container';
import {
  GameSprintResultScreen,
} from '../game-sprint-result-screen/game-sprint-result-screen';

export class GameSprintActiveScreen extends BaseComponent {
  element: HTMLDivElement;

  points = new SprintPoints();

  gameIsActive = true;

  wordContainer = new SprintWordContainer();

  correctButton =
    new ButtonBaseElement(['game-sprint__active-screen-correct-button'], 'верно');

  incorrectButton =
    new ButtonBaseElement(['game-sprint__active-screen-incorrect-button'], 'не верно');

  timer = new BaseComponent('div', ['game-sprint__active-screen-sprint-timer']);

  rounds = 0;

  multiplierContainer = new BaseComponent(
    'div',
    ['game-sprint__active-screen-sprint-multiplier'],
    'Множитель очков: 1, +10',
  );

  streakContainer = new BaseComponent(
    'div',
    ['game-sprint__active-screen-sprint-streak'],
    'Верных ответов подряд до увеличения множителя очков: 3',
  );

  streakCount = 0;

  roundsWin = 0;

  wordsData: IWord[];

  startTimeAnimation: null | number = null;

  pointsMultiplier = 1;

  resultGame: {
    correct: IWord[],
    mistake: IWord[]
  } = {
    correct: [],
    mistake: [],
  };

  constructor(private level: WordDifficultyGroup) {
    super('div', ['game-sprint__active-screen']);

    this.start();

    this.correctButton.element.addEventListener('click', async () => {
      this.gameLogicOnAnswer(true);
    });

    this.incorrectButton.element.addEventListener('click', async () => {
      this.gameLogicOnAnswer(false);
    });

    document.addEventListener('keydown', (e) => {
      this.keyboardKeyPressListener(e);
    });
  }

  async gameLogicOnAnswer(isCorrectButton: boolean) {
    if (this.gameIsActive) {
      if (this.wordDataIsEmpty()) {
        await this.getWordData();
      }
      this.rounds += 1;
      if (this.wordContainer.isCorrectAnswer() === isCorrectButton) {
        this.resultGame.correct.push(this.wordContainer.wordPair[0]);
        this.counterIncrease();
        this.streakCount += 1;
        this.roundsWin += 1;
        this.calculatePointsMultiplier();
      } else {
        this.resultGame.mistake.push(this.wordContainer.wordPair[0]);
        this.streakCount = 0;
        this.calculatePointsMultiplier();
      }
      this.renderStreakContainer();
      this.renderMultiplierContainer();
      await this.wordContainer.setWordPair(this.wordsData);
      await this.wordContainer.renderWordPair();
    }
  }

  wordDataIsEmpty() {
    return (this.wordsData !== undefined) && (this.wordsData.length === 0);
  }

  keyboardKeyPressListener(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 37: {
        this.gameLogicOnAnswer(true);
        break;
      }
      case 39: {
        this.gameLogicOnAnswer(false);
        break;
      }
    }
  }

  async getWordData() {
    const page = getRandomNumber(0, 29).toString();
    const wordData = (await apiWords.getAChunkOfWords(this.level, page)).body;
    if (wordData) {
      this.wordsData = wordData;
    }
  }

  renderMultiplierContainer() {
    const multiplier = this.pointsMultiplier;
    this.multiplierContainer.element.textContent =
      `Множитель очков: ${multiplier}, +${multiplier * 10}`;
  }

  renderStreakContainer() {
    const streak = this.streakCount % 3;
    this.streakContainer.element.textContent =
      `Верных ответов подряд до увеличения множителя очков: ${3 - streak}`;
  }

  calculatePointsMultiplier() {
    this.pointsMultiplier = Math.floor(this.streakCount / 3)
      ? Math.floor(this.streakCount / 3) + 1
      : 1;
  }

  counterIncrease() {
    const basePoints = 10;
    this.points.increasePointsBy(basePoints * this.pointsMultiplier);
    this.points.renderPoints();
  }

  timerAnim = (timestamp: DOMHighResTimeStamp) => {
    if (!this.startTimeAnimation) {
      this.startTimeAnimation = timestamp;
    }
    const timer = 60;
    const progress = timer - (timestamp - this.startTimeAnimation) / 1000;

    this.timer.element.textContent = `${progress.toFixed(0)} с`;
    if (progress > 0) {
      window.requestAnimationFrame(this.timerAnim);
    } else {
      this.gameIsActive = false;
      this.sortResult();
      this.element.replaceWith(new GameSprintResultScreen(this.resultGame).element);
    }
  };

  sortResult() {
    this.resultGame.correct
      = this.resultGame.correct.sort((a, b) => a.word.localeCompare(b.word));
    this.resultGame.mistake
      = this.resultGame.mistake.sort((a, b) => a.word.localeCompare(b.word));
  }

  async start() {
    await this.getWordData();
    const buttonContainer = new BaseComponent(
      'div',
      ['game-sprint__active-screen-button-container'],
    );

    buttonContainer.element.append(
      this.correctButton.element,
      this.incorrectButton.element,
    );

    this.element.append(
      this.points.element,
      this.multiplierContainer.element,
      this.streakContainer.element,
      this.wordContainer.element,
      buttonContainer.element,
      this.timer.element,
    );

    await this.wordContainer.setWordPair(this.wordsData);
    await this.wordContainer.renderWordPair();

    window.requestAnimationFrame(this.timerAnim);
  }
}
