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

export interface IStatusCodeResponse {
  statusCode: number;
}

export interface IWordResponse extends IStatusCodeResponse {
  body: IWord | undefined;
}

export interface IArrayWordResponse extends IStatusCodeResponse {
  body: IWord[] | undefined;
}

export interface IUserAuthInfoResponse extends IStatusCodeResponse {
  body: IUserAuthInfo | undefined;
}

export interface IUserBasicInfoResponse extends IStatusCodeResponse {
  body: IUserBasicInfo | undefined;
}

export interface ICustomResponse<T> extends IStatusCodeResponse {
  body: T | undefined;
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
  Success = 200,
  Forbidden = 403,
  UnprocessableEntity = 422,
}
