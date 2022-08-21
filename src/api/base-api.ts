import { BASE_URL, StatusCode } from './api_interfaces';

export class BaseApi {
  readonly baseUrl = BASE_URL;

  async changeResponseOnCustom(response: Response) {
    if (response.status === StatusCode.Success) {
      return {
        statusCode: response.status,
        body: await response.json(),
      };
    } else {
      return {
        statusCode: response.status,
      };
    }
  }
}
