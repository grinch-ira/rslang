import { BaseUrl } from './base-url';
import { IWord } from './api_interfaces';

class ApiWords extends BaseUrl {
  private readonly wordsUrl = 'words';

  async getAChunkOfWords(group: string, page: string) {
    return fetch(`${this.baseUrl}${this.wordsUrl}?page=${page}&group=${group}`,
      { method: 'GET' })
      .then<IWord[]>(response => response.json());
  }

  async getAWordWithAssetsById(id: string) {
    return fetch(`${this.baseUrl}${this.wordsUrl}/${id}`)
      .then<IWord>(response => response.json());
  }
}

export const apiWords = new ApiWords();
