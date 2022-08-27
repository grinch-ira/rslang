import { StatusCode } from '../../../api/api-interfaces';
import { apiUsers } from '../../../api/api-users';
import { IUserStorageInfo } from '../../models/storage-data';

export class SessionSaver {
  public static getInstance(): SessionSaver {
    if (SessionSaver.instance) {
      return SessionSaver.instance;
    }
    return new SessionSaver();
  }

  private static instance: SessionSaver;

  private actualToken: string;

  private refreshToken: string;

  private userId: string;

  private isActiveSession: boolean;

  private constructor() {
    window.addEventListener('storage', (event) => {
      if (!event.key) {
        this.isActiveSession = false;
        this.logout();
      }
      if (event.key === 'auth') {
        if (!event.newValue) {
          this.isActiveSession = false;
          this.logout();
        } else {
          const newAuthData: IUserStorageInfo = JSON.parse(event.newValue);
          this.userId = newAuthData.userId;
          this.actualToken = newAuthData.token;
          this.refreshToken = newAuthData.refreshToken;
        }
      }
    });
  }

  public get isActive(): boolean {
    return this.isActiveSession;
  }

  public get token(): string {
    return this.actualToken;
  }

  public async loadSessionFromLocalStorage(): Promise<boolean> {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const authData: IUserStorageInfo = JSON.parse(auth);
      apiUsers.getNewUserTokens(authData.userId, authData.refreshToken)
        .then((data) => {
          if (data.statusCode === StatusCode.Success) {
            const newAuthData = data.body;
            if (newAuthData) {
              this.actualToken = newAuthData.token;
              this.refreshToken = newAuthData.refreshToken;
              this.userId = authData.userId;
              this.saveToStorage();
              this.isActiveSession = true;
            }
          }
        }).then(() => {
          return this.isActiveSession;
        });
    } else {
      this.isActiveSession = false;
    }
    return this.isActiveSession;
  }

  public logout(): void {
    if (this.isActiveSession) {
      apiUsers.getNewUserTokens(this.userId, this.refreshToken);
      localStorage.removeItem('auth');
      this.actualToken = '';
      this.userId = '';
      this.refreshToken = '';
      this.isActiveSession = false;
    } else {
      this.actualToken = '';
      this.userId = '';
      this.refreshToken = '';
    }
  }

  public startSession(userId: string, token: string, refreshToken: string): void {
    this.userId = userId;
    this.actualToken = token;
    this.refreshToken = refreshToken;
    this.isActiveSession = true;
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('auth', JSON.stringify({
      userId: this.userId,
      token: this.actualToken,
      refreshToken: this.refreshToken,
    }));
  }
}
