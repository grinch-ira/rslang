import { apiWords } from '../../../api/api-words';
import { LevelSwitcher } from '../level-switcher/level-switcher';
import { PageSwitcher } from '../page-switcher/page-switcher';
import { ISubscriber } from '../../models/textbook-interfaces';
import { WordPresenter } from '../word-presenter/word-presenter';
import { WordsList } from '../words-list/words-list';
import { StatusCode, WordDifficultyGroup } from '../../../api/api-interfaces';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { proxyApi } from '../proxy-api/proxy-api';
import './textbook.scss';

export class Textbook extends BaseComponent implements ISubscriber {
  private levelSwitcher: LevelSwitcher;

  private pageSwitcher: PageSwitcher;

  private wordList: WordsList;

  private wordPresenter: WordPresenter;

  private level: WordDifficultyGroup;

  constructor() {
    super('div', ['textbook']);
    this.levelSwitcher = new LevelSwitcher();
    this.levelSwitcher.register(this);

    this.wordList = new WordsList();

    this.wordPresenter = new WordPresenter();
    this.wordList.register(this.wordPresenter);

    this.pageSwitcher = new PageSwitcher(30);
    this.pageSwitcher.register(this);
    const wordCascade = new BaseComponent('div', ['textbook__word-cascade']).element;
    wordCascade.append(
      this.wordList.element,
      this.wordPresenter.element,
    );

    this.element.append(
      new BaseComponent('div', ['textbook__header'], 'Учебник').element,
      this.levelSwitcher.element,
      wordCascade,
      this.pageSwitcher.element,
      this.getGameLinkContainer(),
    );
    this.loadWords();
  }

  public update(): void {
    this.loadWords();
  }

  private loadWords(): void {
    this.element.classList.remove(`level-${this.level}`);
    const newLevel = this.levelSwitcher.getCurrentLevel();
    this.element.classList.add(`level-${newLevel}`);
    this.wordPresenter.show();
    if (this.level !== newLevel) {
      this.pageSwitcher.setCurrentPage(0);
    }
    this.level = newLevel;
    if (+newLevel < 6) {
      apiWords.getAChunkOfWords(
        this.level,
        this.pageSwitcher.getCurrentPage().toString(),
      ).then((result) => {
        if (result.statusCode === StatusCode.Success) {

          if (result.body) {
            this.wordList.setWords(result.body);
            this.wordPresenter.hardUpdate = null;
          }

        }
      });
    } else {

      switch (newLevel) {
        case '6':
          proxyApi.getAllUserAggregatedWords(
            '{"$and":[{"userWord.optional.isHard":true}]}',
          ).then((result) => {
            if (result.totalCount.length) {

              if (result.totalCount[0].count > 0 ) {

                if (result.paginatedResults) {
                  this.wordList.setWords(result.paginatedResults);
                  this.wordPresenter.hardUpdate = () => { this.loadWords(); };
                }

              }

            } else {
              this.wordPresenter.hide();
              this.wordList.drawEmpty();
            }
          });
          break;
      }
    }
  }

  private getGameLinkContainer(): HTMLDivElement {
    const gameLinkContainer = document.createElement('div');
    gameLinkContainer.classList.add('textbook__game-link-container');

    const gameLinkWrapper = document.createElement('div');
    gameLinkWrapper.classList.add('textbook__game-link-wrapper');

    const gameLinkHeader = document.createElement('h2');
    gameLinkHeader.classList.add('textbook__game-header');
    gameLinkHeader.textContent = 'Игры';

    const linkSprint = document.createElement('a');
    linkSprint.classList.add('textbook__game-link');
    linkSprint.setAttribute('href', '#');

    const linkAudiocall = document.createElement('a');
    linkAudiocall.classList.add('textbook__game-link');
    linkAudiocall.setAttribute('href', '#');

    const titleSprint = document.createElement('p');
    titleSprint.classList.add('textbook__game-title');
    titleSprint.textContent = 'Спринт';

    const titleAudiocall = document.createElement('p');
    titleAudiocall.classList.add('textbook__game-title');
    titleAudiocall.textContent = 'Аудиовызов';

    const iconSprint = document.createElement('img');
    iconSprint.classList.add('textbook__game-img');
    iconSprint.setAttribute('src', './assets/sprint.jpg');
    iconSprint.setAttribute('alt', 'Icon Sprint Game');

    const iconAudiocall = document.createElement('img');
    iconAudiocall.classList.add('textbook__game-img');
    iconAudiocall.setAttribute('src', './assets/audiocall.jpg');
    iconAudiocall.setAttribute('alt', 'Icon Audiocall Game');

    linkSprint.append(titleSprint, iconSprint);
    linkAudiocall.append(titleAudiocall, iconAudiocall);

    gameLinkWrapper.append(linkSprint, linkAudiocall);

    gameLinkContainer.append(gameLinkHeader, gameLinkWrapper);

    return gameLinkContainer;
  }
}
