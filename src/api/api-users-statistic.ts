import { BaseApi } from './base-api';
import { IStatisticBody, IUserStatisticResponse } from './api-interfaces';

export class ApiUsersStatistic extends BaseApi {

  async getStatistics(
    userId: string,
    token: string,
  ): Promise<IUserStatisticResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(async (response) => this.changeResponseOnCustom(response));
  }

  async upsertStatistics(
    userId: string,
    statisticBody: IStatisticBody,
    token: string,
  ): Promise<IUserStatisticResponse> {
    return fetch(`${this.baseUrl}/users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statisticBody),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }
}

export const apiUsersStatistic = new ApiUsersStatistic();
