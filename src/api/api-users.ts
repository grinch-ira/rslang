import { BaseApi } from './base-api';
import {
  IDeleteResponse,
  IUserAuthInfoResponse,
  IUserBasicInfoResponse,
} from './api_interfaces';

class ApiUsers extends BaseApi {
  private readonly usersUrl = 'users';

  async createANewUser(name: string, email: string, password: string)
    : Promise<IUserBasicInfoResponse> {
    return fetch(`${this.baseUrl}/${this.usersUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async getUser(id: string, token: string): Promise<IUserBasicInfoResponse> {
    return fetch(`${this.baseUrl}/${this.usersUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async updateAUser(id: string, email: string, password: string, token: string)
    : Promise<IUserBasicInfoResponse> {
    return fetch(`${this.baseUrl}/${this.usersUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async deleteAUser(id: string, token: string): Promise<IDeleteResponse> {
    return fetch(`${this.baseUrl}/${this.usersUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => ({ statusCode: response.status }));
  }

  async getNewUserTokens(id: string, token: string): Promise<IUserAuthInfoResponse> {
    return fetch(`${this.baseUrl}/${this.usersUrl}/${id}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }
}

export const apiUsers = new ApiUsers();
