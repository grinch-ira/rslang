import { BaseUrl } from './base-url';
import { IUserAuthInfo, IUserBasicInfo } from './api_interfaces';

class ApiUsers extends BaseUrl {
  private readonly usersUrl = 'users';

  async createANewUser(name: string, email: string, password: string)
    : Promise<IUserBasicInfo> {
    return fetch(`${this.baseUrl}${this.usersUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async getUser(id: string, token: string): Promise<IUserBasicInfo> {
    return fetch(`${this.baseUrl}${this.usersUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async updateAUser(id: string, email: string, password: string, token: string)
    : Promise<IUserBasicInfo> {
    return fetch(`${this.baseUrl}${this.usersUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(response => response.json())
      .catch(() => {
      });
  }

  async deleteAUser(id: string, token: string) {
    return fetch(`${this.baseUrl}${this.usersUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.status)
      .catch(() => {
      });
  }

  async getNewUserTokens(id: string, token: string): Promise<IUserAuthInfo> {
    return fetch(`${this.baseUrl}${this.usersUrl}/${id}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .catch(() => {
      });
  }
}

export const apiUsers = new ApiUsers();
