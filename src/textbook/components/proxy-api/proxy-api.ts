import {
  IArrayAggregatedWordsBody,
  IWordBody,
  StatusCode,
} from '../../../api/api-interfaces';
import { apiUsersAggregatedWords } from '../../../api/api-users-aggregated-words';
import { apiUsersWords } from '../../../api/api-users-words';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { IUserWordOptions } from './proxy-interface';

class ProxyApi {
  session: SessionSaver;

  constructor() {
    this.session = SessionSaver.getInstance();
  }

  async getAUserWordById(wodrId: string): Promise<IUserWordOptions | undefined> {
    return apiUsersWords.getAUserWordById(this.session.userId, wodrId, this.session.token)
      .then((response) => {
        return response.statusCode === StatusCode.Success
          ? response.body?.optional as IUserWordOptions : undefined;
      });
  }

  async createAUserWord(wodrId: string): Promise<IUserWordOptions> {
    const defaultOptions = {
      optional: {
        isHard: false,
      },
    };
    return apiUsersWords.createAUserWord(
      this.session.userId,
      wodrId,
      defaultOptions as IWordBody,
      this.session.token,
    ).then((result) => {
      return result.body?.optional as IUserWordOptions;
    });
  }

  async updateAUserWord(
    wordId: string,
    wordBody: IUserWordOptions,
  ): Promise<IUserWordOptions> {
    return apiUsersWords.updateAUserWord(
      this.session.userId,
      wordId,
      { optional: wordBody } as IWordBody,
      this.session.token,
    ).then((result) => {
      return result.body?.optional as IUserWordOptions;
    });
  }

  async getAllUserAggregatedWords(filter: string): Promise<IArrayAggregatedWordsBody> {
    return apiUsersAggregatedWords.getAllUserAggregatedWords(
      this.session.userId,
      '',
      '3600',
      this.session.token,
      filter).then((response) => {
      return (
        response.body as IArrayAggregatedWordsBody[]
      )[0] as IArrayAggregatedWordsBody;
    });
  }
}

export const proxyApi = new ProxyApi();
