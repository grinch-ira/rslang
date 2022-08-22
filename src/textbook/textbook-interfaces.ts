import { IWord, WordDifficultyGroup } from '../api/api-interfaces';

export interface IPublisher {
  register(subscriber: ISubscriber): void;
  unregister(subscriber: ISubscriber): void;
  notify(): void;
}

export interface ISubscriber {
  update(publisher?: IPublisher): void;
}

// export interface ISubscriberPageButton {

// }

export interface ISubscriberLevelButton {
  update(publisher: IPublisherLevelButton): void;
}

export interface IPublisherWordList extends IPublisher {
  currentCheckWord: IWord;
}

export interface IPublisherLevelButton extends IPublisher {
  level: WordDifficultyGroup;
}
