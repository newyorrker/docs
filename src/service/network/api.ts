import axios, { AxiosInstance } from 'axios';
import { refreshSession } from '../../helpers/interopHelper';
import { UserProfile } from '../../models/UserProfile';

export default class Api {
  client: AxiosInstance;
  subscribers: any = [];
  isTokenUpdating = false;
  private static instance: Api;

  private constructor(public readonly name: string) {
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response && error.response.status === 401) {
          const originalRequest = error.config;
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber((newToken: string) => {
              originalRequest.headers['X-Appercode-Session-Token'] = newToken;
              resolve(this.client(originalRequest));
            });
          });

          if (!this.isTokenUpdating) {
            this.isTokenUpdating = true;
            refreshSession();
          }
          return retryOriginalRequest;
        } else {
          console.log('Не удалось выполнить обновление');
        }
        return Promise.reject(error);
      },
    );
  }

  public static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api('Api' + Math.random());
    }

    return Api.instance;
  }

  public getClient() {
    return this.client;
  }

  public ownProfile() {
    return this.client.get(`/users/me/profile`)
      .then(({data}) => {
          return data ? new UserProfile(data) : null;
      });
  }

  public setSession(newSession: Record<string, string>): void {
    this.client.defaults.baseURL = newSession.backendUrl || newSession.baseUrl + newSession.projectName;
    this.client.defaults.headers.common['X-Appercode-Session-Token'] = newSession.sessionId;

    this.onTokenFetched(newSession.sessionId);
    this.isTokenUpdating = false;
  }

  private addSubscriber(callback: any) {
    this.subscribers.push(callback);
  }

  private onTokenFetched(newToken: string) {
    this.subscribers.forEach((callback: any) => callback(newToken));
    this.subscribers = [];
  }
}
