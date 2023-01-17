interface ColorScheme {
  panel_background?: string;
  panel_foreground?: string;
  panel_accent?: string;
  accent?: string;
}

interface SessionError {
  code?: string;
  message?: string;
}

interface SessionUserProfile {
  lastName?: string;
  firstName?: string;
  email?: string;
  groupIds?: Array<string>;
}

interface Session {
  baseUrl?: string;
  backendUrl?: string;
  projectName?: string;
  appPlatform?: string;
  appVersion?: string;
  language?: string;
  installationId?: string;
  sessionId?: string;
  refreshToken: string;
  userId?: number;
  isAnonymous?: boolean;
  colorScheme?: ColorScheme;
  error?: SessionError;
  userProfile?: SessionUserProfile;
  key?: string;
}

export { Session };
