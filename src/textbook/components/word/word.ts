import { IWord, StatusCode } from '../../../api/api-interfaces';
import { apiUsersWords } from '../../../api/api-users-words';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './word.scss';

export class Word extends BaseComponent {
  word: IWord;

  difficulty: string;

  constructor(word: IWord) {
    super('div', ['word']);
    this.word = word;
    this.element.append(
      new BaseComponent('p', ['word__text'], word.word).element,
      new BaseComponent('p', ['word__translate'], word.wordTranslate).element,
    );
    const session = SessionSaver.getInstance();
    if (session.isActive) {
      apiUsersWords.getAUserWordById(session.userId, word.id, session.token)
        .then((response) => {
          if (response.statusCode === StatusCode.Success) {
            const options = response.body;
            if (options) {
              this.difficulty = options.difficulty;
              this.element.classList.add(`word__difficulty-${options.difficulty}`);
            }
          }
        });
    }
  }
}
