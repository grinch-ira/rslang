export const BASE_URL = 'https://rslang-task.herokuapp.com/';

export interface IErrorInfo {
  statusCode: number;
  message: number;
}

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

//TODO переписать difficulty в Enum
//TODO конкретизировать поле optional
export interface IWordBody {
  difficulty: '0' | '1' | '2' | '3' | '4';
  optional: object;
}
