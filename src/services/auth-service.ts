export enum StorageKey {
  TOKEN = 'next_app_token',
  REFRESH_TOKEN = 'next_app_refresh_token',
}

export const saveToken = (token: string) => localStorage.setItem(StorageKey.TOKEN, token);

export const getToken = () => localStorage.getItem(StorageKey.TOKEN);

export const removeToken = () => localStorage.removeItem(StorageKey.TOKEN);

export const saveRefreshToken = (refreshToken: string) => localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);

export const getRefreshToken = () => localStorage.getItem(StorageKey.REFRESH_TOKEN);

export const removeRefreshToken = () => localStorage.removeItem(StorageKey.REFRESH_TOKEN);

export const cleanAuthStorage = () => {
  removeToken();
  removeRefreshToken();
};

export const isLoggedIn = () => !!localStorage.getItem(StorageKey.TOKEN);

export const logOut = () => {
  removeToken();
  removeRefreshToken();
  // window.location.href = '/';
};

export const toErrorPage = () => {
  window.location.href = '/exception';
};
