import { BaseUrl } from './base-url';
import { IArrayWordResponse, IWordResponse } from './api_interfaces';

class ApiWords extends BaseUrl {
  private readonly wordsUrl = 'words';

  getAChunkOfWords(group: string, page: string): Promise<IArrayWordResponse> {
    return fetch(
      `${this.baseUrl}${this.wordsUrl}?page=${page}&group=${group}`,
      { method: 'GET' },
    ).then(async (response) => {
      if (response.status === 200) {
        return {
          statusCode: response.status,
          body: await response.json(),
        };
      } else {
        return {
          statusCode: response.status,
        };
      }
    });
  }

  getAWordWithAssetsById(id: string): Promise<IWordResponse> {
    return fetch(
      `${this.baseUrl}${this.wordsUrl}/${id}`,
      { method: 'GET' },
    ).then(async (response) => {
      if (response.status === 200) {
        return {
          statusCode: response.status,
          body: await response.json(),
        };
      } else {
        return {
          statusCode: response.status,
        };
      }
    });
  }
}

export const apiWords = new ApiWords();