import Platform from '../types/Platform';

export default class Session {
  userId?: number;
  sessionId?: string;
  appPlatform?: Platform;
  backendUrl?: string;
  baseUrl?: string;
  projectName?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
