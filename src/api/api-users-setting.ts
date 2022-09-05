import { BaseApi } from './base-api';
import { ISettingBody, IUserSettingResponse } from './api-interfaces';

export class ApiUsersSetting extends BaseApi {

  async getSettings(
    userId: string,
    token: string,
  ): Promise<IUserSettingResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/settings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async upsertSettings(
    userId: string,
    statisticBody: ISettingBody,
    token: string,
  ): Promise<IUserSettingResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statisticBody),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }
}

export const apiUsersSetting = new ApiUsersSetting();
