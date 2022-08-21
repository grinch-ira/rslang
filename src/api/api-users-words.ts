import { BaseApi } from './base-api';
import { IWordBody } from './api_interfaces';

class ApiUsersWords extends BaseApi {

  async getAllUserWords(id: string, token: string) {
    return fetch(`${this.baseUrl}/users/${id}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async getAUserWordById(userId: string, wordId: string, token: string) {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async createAUserWord(
    userId: string,
    wordId: string,
    wordBody: IWordBody,
    token: string,
  ) {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBody),
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async updateAUserWord(
    userId: string,
    wordId: string,
    wordBody: IWordBody,
    token: string,
  ) {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordBody),
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async deleteUserWord(
    userId: string,
    wordId: string,
    token: string,
  ) {
    return fetch(`${this.baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .catch(() => {
      });
  }
}

export const apiUsersWords = new ApiUsersWords();
