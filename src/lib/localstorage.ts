import localforage from 'localforage';
import { APP_NAME } from 'src/utils/constants';

localforage.config({
  name: APP_NAME,
  version: 1.0,
  storeName: `${APP_NAME}_data`,
});

export const getItem = async (name: string): Promise<string | null> => localforage.getItem(name);

export const setItem = async (name: string, value: string): Promise<void> => {
  await localforage.setItem(name, value);
};

export const removeItem = async (name: string): Promise<void> => {
  await localforage.removeItem(name);
};
