import {
  BASE_URL,
  ICustomResponse,
  StatusCode,
} from './api-interfaces';

export class BaseApi {
  readonly baseUrl = BASE_URL;

  async changeResponseOnCustom<T>(response: Response):Promise<ICustomResponse<T>> {
    if (response.status === StatusCode.Success) {
      return {
        statusCode: response.status,
        body: await response.json(),
      };
    } else {
      return {
        statusCode: response.status,
        body: undefined,
      };
    }
  }
}
