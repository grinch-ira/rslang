import { BaseUrl } from './base-url';
import { IUserAuthInfo } from './api_interfaces';

class ApiSignIn extends BaseUrl {
  private readonly singInUrl = 'signin';

  async signIn(email: string, password: string): Promise<IUserAuthInfo> {
    return fetch(`${this.baseUrl}${this.singInUrl}`, {
      method: 'POST',
      headers: {
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
}

export const apiSingIn = new ApiSignIn();
