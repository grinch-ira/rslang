import { IWord } from '../../../api/api-interfaces';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { proxyApi } from '../proxy-api/proxy-api';
import { IUserWordOptions } from '../proxy-api/proxy-interface';
import './word.scss';

export class Word extends BaseComponent {
  word: IWord;

  userOptions: IUserWordOptions | null;

  difficulty: string;

  constructor(word: IWord) {
    super('div', ['word']);

    if (word._id) {
      word.id = word._id;
    }

    this.word = word;
    this.userOptions = null;
    this.element.append(
      new BaseComponent('p', ['word__text'], word.word).element,
      new BaseComponent('p', ['word__translate'], word.wordTranslate).element,
    );
    this.update();
  }

  update() {
    const session = SessionSaver.getInstance();
    if (session.isActive) {
      proxyApi.getAUserWordById(this.word.id).then((result) => {
        if (result) {
          this.userOptions = result;

          if (this.userOptions.isHard) {
            this.element.classList.add('word__difficulty-hard');
          } else {
            this.element.classList.remove('word__difficulty-hard');
          }
        }
      });
    }
  }
}
