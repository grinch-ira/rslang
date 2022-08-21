export const BASE_URL = 'https://rslang-task.herokuapp.com';

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IWordResponse {
  statusCode: number;
  body?: IWord;
}

export interface IArrayWordResponse {
  statusCode: number;
  body?: IWord[];
}

export interface IUserBasicInfo {
  name: string;
  email: string;
  password: string;
}

export interface IUserAuthInfo {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IUserAuthInfoResponse {
  statusCode: number;
  body?: IUserAuthInfo;
}

export interface IUserBasicInfoResponse {
  statusCode: number;
  body?: IUserBasicInfo;
}

export interface IDeleteResponse {
  statusCode: number;
}

export enum WordDifficultyGroup {
  A1 = '0',
  A2 = '1',
  B1 = '2',
  B2 = '3',
  C1 = '4',
  C2 = '5',
}

//TODO конкретизировать поле optional
export interface IWordBody {
  difficulty: WordDifficultyGroup;
  optional: object;
}

export enum StatusCode {
  SuccessCode = 200,
}
