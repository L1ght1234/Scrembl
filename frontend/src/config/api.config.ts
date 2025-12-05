export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  signalRUrl: import.meta.env.VITE_SIGNALR_URL || 'http://localhost:5000/gamehub',
  timeout: 30000,
} as const;

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.baseUrl.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

export const getSignalRUrl = (): string => {
  return API_CONFIG.signalRUrl;
};

