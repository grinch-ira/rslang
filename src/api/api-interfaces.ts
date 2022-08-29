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
  userWord?: IWordBody;
  _id?: string;
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

export interface IUserNewTokenInfo {
  refreshToken: string;
  token: string;
}

//TODO конкретизировать поле optional
export interface IWordBody {
  difficulty: WordDifficultyGroup;
  optional: object;
}

//TODO конкретизировать поле optional
export interface IStatisticBody {
  learnedWords: number;
  optional: object;
}

//TODO конкретизировать поле optional
export interface ISettingBody {
  wordsPerDay: number;
  optional: object;
}

export interface IArrayAggregatedWordsBody {
  paginatedResults: IWord[];
  totalCount: { count: number }[];
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

export interface IUserNewTokenInfoResponse extends IStatusCodeResponse {
  body: IUserNewTokenInfo | undefined;
}

export interface IUserBasicInfoResponse extends IStatusCodeResponse {
  body: IUserBasicInfo | undefined;
}

export interface IUserWordResponse extends IStatusCodeResponse {
  body: IWordBody | undefined;
}

export interface IArrayUserWordResponse extends IStatusCodeResponse {
  body: IWordBody[] | undefined;
}

export interface IUserAggregatedWordResponse extends IStatusCodeResponse {
  body: IWord[] | undefined;
}

export interface IArrayUserAggregatedWordResponse extends IStatusCodeResponse {
  body: IArrayAggregatedWordsBody[] | undefined;
}

export interface IUserStatisticResponse extends IStatusCodeResponse {
  body: IStatisticBody | undefined;
}

export interface IUserSettingResponse extends IStatusCodeResponse {
  body: ISettingBody | undefined;
}

export interface ICustomResponse<T> extends IStatusCodeResponse {
  body: T | undefined;
}


export enum WordDifficultyGroup {
  A1 = '0',
  A2 = '1',
  B1 = '2',
  B2 = '3',
  C1 = '4',
  C2 = '5',
  HW = '6',
}

export enum StatusCode {
  Success = 200,
  Forbidden = 403,
  ExpectationFailed = 417,
  UnprocessableEntity = 422,
}
