import { BaseApi } from './base-api';
import { IArrayWordResponse, IWordResponse, WordDifficultyGroup } from './api_interfaces';

class ApiWords extends BaseApi {
  private readonly wordsUrl = 'words';

  getAChunkOfWords(
    group: WordDifficultyGroup,
    page: string,
  ): Promise<IArrayWordResponse> {
    return fetch(
      `${this.baseUrl}/${this.wordsUrl}?page=${page}&group=${group}`,
      { method: 'GET' },
    ).then(async (response) => this.changeResponseOnCustom(response));
  }

  getAWordWithAssetsById(id: string): Promise<IWordResponse> {
    return fetch(
      `${this.baseUrl}/${this.wordsUrl}/${id}`,
      { method: 'GET' },
    ).then(async (response) => this.changeResponseOnCustom(response));
  }
}

export const apiWords = new ApiWords();
