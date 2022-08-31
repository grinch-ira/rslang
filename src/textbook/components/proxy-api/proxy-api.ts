import {
  IArrayAggregatedWordsBody,
  IWordBody,
  StatusCode,
} from '../../../api/api-interfaces';
import { apiUsersAggregatedWords } from '../../../api/api-users-aggregated-words';
import { apiUsersWords } from '../../../api/api-users-words';
import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { OPTION_DEFAULT } from '../../models/default-optional';
import { IUserWordOptions } from '../../models/proxy-interface';

class ProxyApi {
  session: SessionSaver;

  constructor() {
    this.session = SessionSaver.getInstance();
  }

  async getAUserWordById(wordId: string): Promise<IUserWordOptions | undefined> {
    return apiUsersWords.getAUserWordById(this.session.userId, wordId, this.session.token)
      .then((response) => {
        return response.statusCode === StatusCode.Success
          ? response.body?.optional as IUserWordOptions : undefined;
      });
  }

  async createAUserWord(wordId: string): Promise<IUserWordOptions> {

    return apiUsersWords.createAUserWord(
      this.session.userId,
      wordId,
      OPTION_DEFAULT as IWordBody,
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
