import { WordDifficultyGroup } from '../api/api-interfaces';
import { Word } from './word/word';


export interface IPublisher {
  register(subscriber: ISubscriber): void;
  unregister(subscriber: ISubscriber): void;
  notify(): void;
}

export interface ISubscriber {
  update(publisher?: IPublisher): void;
}

export interface ISubscriberLevelButton {
  update(publisher: IPublisherLevelButton): void;
}

export interface IPublisherWordList extends IPublisher {
  currentCheckWord: Word;
}

export interface IPublisherLevelButton extends IPublisher {
  level: WordDifficultyGroup;
}
