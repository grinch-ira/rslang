import { BaseApi } from './base-api';
import {
  IArrayUserAggregatedWordResponse,
  IUserAggregatedWordResponse,
  WordDifficultyGroup,
} from './api-interfaces';

export class ApiUsersAggregatedWords extends BaseApi {

  async getAllUserAggregatedWords(
    userId: string,
    page: string,
    wordsPerPage: string,
    token: string,
    filter: string,
    group?: WordDifficultyGroup,
  ): Promise<IArrayUserAggregatedWordResponse> {
    const requestString = `${this.baseUrl}/users/${userId}/aggregatedWords?
page=${page}&wordsPerPage=${wordsPerPage}`
      + (filter ? `&filter=${filter}` : '')
      + (group ? `&group=${group}` : '');

    return fetch(requestString, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async getAUserAggregatedWordById(
    userId: string,
    wordId: string,
    token: string,
  ): Promise<IUserAggregatedWordResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }
}


export const apiUsersAggregatedWords = new ApiUsersAggregatedWords();
