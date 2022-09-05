import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IWord, WordDifficultyGroup } from '../../../api/api-interfaces';
import { apiWords } from '../../../api/api-words';
import { getRandomNumber } from '../../models/text';
import './game-audiocall-active-screen.scss';


export class GameAudioCallActiveScreen extends BaseComponent {
  element: HTMLDivElement;

  gameIsActive = true;

  rounds = 0;

  streakCount = 0;

  roundsWin = 0;

  wordsData: IWord[];

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

  sortResult() {
    this.resultGame.correct
      = this.resultGame.correct.sort((a, b) => a.word.localeCompare(b.word));
    this.resultGame.mistake
      = this.resultGame.mistake.sort((a, b) => a.word.localeCompare(b.word));
  }

  async start() {
    await this.getWordData();

  }
}
