import { StartPage } from '../../start-page/components/start-page/start-page';
import { FormLogin } from '../../auth/components/form-login/form-login';
import { HeaderWrapper } from '../../start-page/components/header-wrapper/header-wrapper';
import { BaseComponent } from '../../shared/components/base-element/base-component';
import { Footer } from '../../start-page/components/footer/footer';
import { GamesPage } from '../../games-page/games-page';
export const enum PageHash {
  startPage = 'main',
  formLogin = 'login',
  gamesPage = 'games',
}

export class App {
  private header: HeaderWrapper;

  private main: BaseComponent;

  private footer: Footer;

  private renderNewPage(componentName: string) {
    let page: BaseComponent | undefined;

    switch (componentName) {
      case PageHash.startPage: {
        page = new StartPage();
        break;
      }
      case PageHash.formLogin: {
        page = new FormLogin();
        break;
      }
      case PageHash.gamesPage:{
        page = new GamesPage();
        break;
      }
      //TODO: добавить оставшиеся
      default: {
        page = new StartPage();
      }
    }

    if (page) {
      this.main.element.innerHTML = '';
      this.main.element.append(page.element);
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
