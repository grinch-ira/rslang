import { BaseUrl } from './base-url';
import { IUserAuthInfoResponse } from './api_interfaces';

class ApiSignIn extends BaseUrl {
  private readonly singInUrl = 'signin';

  async signIn(email: string, password: string): Promise<IUserAuthInfoResponse> {
    return fetch(`${this.baseUrl}${this.singInUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (response) => {
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

export const apiSingIn = new ApiSignIn();
