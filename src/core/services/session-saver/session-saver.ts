import { StatusCode } from '../../../api/api-interfaces';
import { apiUsers } from '../../../api/api-users';
import { IUserStorageInfo } from '../../models/storage-data';

export class SessionSaver {
  public static getInstance(): SessionSaver {
    if (SessionSaver.instance) {
      return SessionSaver.instance;
    }
    SessionSaver.instance = new SessionSaver();
    return SessionSaver.instance;
  }

  private static instance: SessionSaver;

  private tokenActual: string;

  private refreshToken: string;

  private userIdActual: string;

  private isActiveSession: boolean;

  private updaterTokens: NodeJS.Timer;

  private constructor() {
    this.isActiveSession = false;
    const auth = localStorage.getItem('auth');
    if (auth) {
      const authData: IUserStorageInfo = JSON.parse(auth);
      this.tokenActual = authData.token;
      this.refreshToken = authData.refreshToken;
      this.userIdActual = authData.userId;
      this.isActiveSession = true;
      this.updaterTokens = setTimeout(() => this.checkSession(), 600000);
    } else {
      this.isActiveSession = false;
    }
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
          this.userIdActual = newAuthData.userId;
          this.tokenActual = newAuthData.token;
          this.refreshToken = newAuthData.refreshToken;
        }
      }
    });
  }

  public get isActive(): boolean {
    return this.isActiveSession;
  }

  public get token(): string {
    return this.tokenActual;
  }

  public get userId(): string {
    return this.userIdActual;
  }

  public async checkSession(): Promise<boolean> {
    return apiUsers.getNewUserTokens(this.userIdActual, this.refreshToken)
      .then((data) => {
        if (data.statusCode === StatusCode.Success) {
          const newAuthData = data.body;
          if (newAuthData) {
            this.tokenActual = newAuthData.token;
            this.refreshToken = newAuthData.refreshToken;
            this.saveToStorage();
            this.isActiveSession = true;
            this.updaterTokens = setTimeout(() => this.checkSession(), 600000);
            return this.isActiveSession;
          }
        }
        this.logout();
        this.isActiveSession = false;
        return this.isActiveSession;
      });
  }

  public logout(): void {
    if (this.isActiveSession) {
      apiUsers.getNewUserTokens(this.userIdActual, this.refreshToken);
      localStorage.removeItem('auth');
      this.tokenActual = '';
      this.userIdActual = '';
      this.refreshToken = '';
      this.isActiveSession = false;
    } else {
      this.tokenActual = '';
      this.userIdActual = '';
      this.refreshToken = '';
    }
    clearTimeout(this.updaterTokens);
  }

  public startSession(userId: string, token: string, refreshToken: string): void {
    this.userIdActual = userId;
    this.tokenActual = token;
    this.refreshToken = refreshToken;
    this.isActiveSession = true;
    this.saveToStorage();
    this.updaterTokens = setTimeout(() => this.checkSession(), 600000);
  }

  private saveToStorage(): void {
    localStorage.setItem('auth', JSON.stringify({
      userId: this.userIdActual,
      token: this.tokenActual,
      refreshToken: this.refreshToken,
    }));
  }
}
