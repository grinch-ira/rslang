export interface IUserWordOptionsResponse {
  difficulty: string;
  optional: IUserWordOptions;
  id?: string;
  wordId?: string;
}

export interface IUserWordOptions {
  isHard: boolean;
  isStudied: boolean;
}
