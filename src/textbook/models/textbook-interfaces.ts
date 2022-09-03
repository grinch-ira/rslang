import { WordDifficultyGroup } from '../../api/api-interfaces';
import { Word } from '../components/word/word';


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

export const TEXTBOOK_LEVEL_DESCRIPTION = [
  'Изи',
  'Легко',
  'Средне',
  'Средне+',
  'Трудно',
  'Кошмар',
  'Сложные слова',
];

export enum TextbookDifficulty {
  A1 = '0',
  A2 = '1',
  B1 = '2',
  B2 = '3',
  C1 = '4',
  C2 = '5',
  HW = '6',
}
