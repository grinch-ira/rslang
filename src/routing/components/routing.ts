import { StartPage } from '../../start-page/components/start-page/start-page';
import { FormLogin } from '../../auth/components/form-login/form-login';
import { HeaderWrapper } from '../../start-page/components/header-wrapper/header-wrapper';
import { BaseComponent } from '../../shared/components/base-element/base-component';
import { Footer } from '../../start-page/components/footer/footer';
import { Textbook } from '../../textbook';
import { GamesPage } from '../../games-page/games-page';
import {
  GameSprintRoot,
} from '../../game-sprint/components/game-sprint-root/game-sprint-root';
import { WordDifficultyGroup } from '../../api/api-interfaces';
import {
  GameAudiocallRoot,
} from '../../game-audiocall/components/game-audiocall-root/game-audiocall-root';

export const enum PageHash {
  startPage = 'main',
  formLogin = 'login',
  textbook = 'textbook',
  gamesPage = 'games',
  sprintGame = 'sprint-game',
  audioCallGame = 'audiocall-game',
}

export class App {
  private header: HeaderWrapper;

  private main: BaseComponent;

  private footer: Footer;

  private renderNewPage(componentName: string) {
    if (componentName.includes(PageHash.sprintGame)) {
      this.footer.element.style.display = 'none';
    } else {
      this.footer.element.style.display = 'flex';
    }

    let page: BaseComponent | undefined;

    if (componentName === PageHash.startPage) {
      page = new StartPage();
    } else if (componentName === PageHash.formLogin) {
      page = new FormLogin();
    } else if (componentName === PageHash.textbook) {
      page = new Textbook();
    } else if (componentName === PageHash.gamesPage) {
      page = new GamesPage();
    } else if (componentName.includes(PageHash.sprintGame)) {
      const [level, pageWord] = componentName.split('/').slice(1);
      if (level) {
        const currentLevel = Object.values(WordDifficultyGroup).sort()[+level];
        page = new GameSprintRoot(currentLevel, pageWord);
      } else {
        page = new GameSprintRoot();
      }
    } else if (componentName.includes(PageHash.audioCallGame)) {
      const [level, pageWord] = componentName.split('/').slice(1);
      if (level) {
        const currentLevel = Object.values(WordDifficultyGroup).sort()[+level];
        page = new GameAudiocallRoot(currentLevel, pageWord);
      } else {
        page = new GameAudiocallRoot();
      }
    } else {
      page = new StartPage();
    }

    if (page) {
      this.main.element.innerHTML = '';
      this.main.element.append(page.element);
      this.header.element.innerHTML = '';
      this.header.element.append(...new HeaderWrapper().element.childNodes);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new HeaderWrapper();
    this.main = new BaseComponent('main', ['main-wrapper']);
    this.footer = new Footer();
  }

  run() {
    document.body.append(this.header.element);
    document.body.append(this.main.element);
    document.body.append(this.footer.element);

    const hash = window.location.hash.slice(1);
    this.renderNewPage(hash);

    this.enableRouteChange();
  }
}
