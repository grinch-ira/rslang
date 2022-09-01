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

  wordContainer = new SprintWordContainer();

  correctButton = new ButtonBaseElement(['correct-button'], 'correct');

  incorrectButton = new ButtonBaseElement(['incorrect-button'], 'incorrect');

  streak = new BaseComponent('div', ['streak'], 'Streak: 0');

  winRate = new BaseComponent('div', ['win-rate'], 'Winrate: 0 %');

  timer = new BaseComponent('div', ['timer'], 'Timer: 0 c');

  rounds = 0;

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
      if (this.wordDataIsEmpty()) {
        await this.getWordData();
      }
      this.rounds += 1;

      if (this.wordContainer.isCorrectAnswer()) {
        this.resultGame.correct.push(this.wordContainer.wordPair[0]);
        this.counterIncrease();
        this.streakCount += 1;
        this.roundsWin += 1;
        this.renderStreak();
      } else {
        this.resultGame.mistake.push(this.wordContainer.wordPair[0]);
        this.streakCount = 0;
        this.renderStreak();
      }

      await this.wordContainer.setWordPair(this.wordsData);
      await this.wordContainer.renderWordPair();
      this.renderWinRate();
    });

    this.incorrectButton.element.addEventListener('click', async () => {
      if (this.wordDataIsEmpty()) {
        await this.getWordData();
      }
      this.rounds += 1;

      if (!this.wordContainer.isCorrectAnswer()) {
        this.resultGame.correct.push(this.wordContainer.wordPair[0]);
        this.counterIncrease();
        this.streakCount += 1;
        this.roundsWin += 1;
        this.renderStreak();
      } else {
        this.resultGame.mistake.push(this.wordContainer.wordPair[0]);
        this.streakCount = 0;
        this.renderStreak();
      }

      await this.wordContainer.setWordPair(this.wordsData);
      await this.wordContainer.renderWordPair();
      this.renderWinRate();
    });
  }

  wordDataIsEmpty() {
    return (this.wordsData !== undefined) && (this.wordsData.length === 0);
  }

  async getWordData() {
    const page = getRandomNumber(0, 29).toString();
    const wordData = (await apiWords.getAChunkOfWords(this.level, page)).body;
    if (wordData) {
      this.wordsData = wordData;
    }
  }

  calculatePointsMultiplier() {
    this.pointsMultiplier = Math.floor(this.streakCount / 3)
      ? Math.floor(this.streakCount / 3) + 1
      : 1;
  }

  counterIncrease() {
    this.calculatePointsMultiplier();
    const basePoints = 10;
    this.points.increasePointsBy(basePoints * this.pointsMultiplier);
    this.points.renderPoints();
  }

  renderStreak() {
    this.streak.element.textContent = `Streak:  ${this.streakCount.toString()}`;
  }

  renderWinRate() {
    this.winRate.element.textContent =
      `Winrate: ${(this.roundsWin / this.rounds * 100).toFixed(0)} %`;
  }


  anim = (timestamp: DOMHighResTimeStamp) => {
    if (!this.startTimeAnimation) {
      this.startTimeAnimation = timestamp;
    }
    const progress = (timestamp - this.startTimeAnimation) / 1000;

    this.timer.element.textContent = `Timer: ${progress.toFixed(0)} с`;
    if (progress < 3) {
      window.requestAnimationFrame(this.anim);
    } else {
      this.sortResult();
      this.element.innerHTML = '';
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

    this.element.append(
      this.points.element,
      this.wordContainer.element,
      this.correctButton.element,
      this.incorrectButton.element,
      this.streak.element,
      this.winRate.element,
      this.timer.element,
    );

    await this.wordContainer.setWordPair(this.wordsData);
    await this.wordContainer.renderWordPair();

    window.requestAnimationFrame(this.anim);
  }
}
