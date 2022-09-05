import { BaseApi } from './base-api';
import {
  IArrayUserWordResponse,
  IStatusCodeResponse,
  IUserWordResponse,
  IWordBody,
} from './api-interfaces';

class ApiUsersWords extends BaseApi {

  async getAllUserWords(
    id: string,
    token: string,
  ): Promise<IArrayUserWordResponse> {
    return fetch(`${this.baseUrl}/users/${id}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async getAUserWordById(
    userId: string,
    wordId: string,
    token: string,
  ): Promise<IUserWordResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async createAUserWord(
    userId: string,
    wordId: string,
    wordBody: IWordBody,
    token: string,
  ): Promise<IUserWordResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBody),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async updateAUserWord(
    userId: string,
    wordId: string,
    wordBody: IWordBody,
    token: string,
  ): Promise<IUserWordResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBody),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async deleteUserWord(
    userId: string,
    wordId: string,
    token: string,
  ): Promise<IStatusCodeResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => ({ statusCode: response.status }));
  }
}

export const apiUsersWords = new ApiUsersWords();
