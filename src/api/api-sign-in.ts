import { BaseApi } from './base-api';
import { IUserAuthInfoResponse } from './api-interfaces';

class ApiSignIn extends BaseApi {
  private readonly signInUrl = 'signin';

  async signIn(email: string, password: string): Promise<IUserAuthInfoResponse> {
    return fetch(`${this.baseUrl}/${this.signInUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (response) => this.changeResponseOnCustom(response));
  }
}

export const apiSignIn = new ApiSignIn();
