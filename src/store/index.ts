/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { IMusic } from 'src/interfaces/music';
import create, { StoreApi } from 'zustand';

export type StoreSlice<T extends object> = (set: StoreApi<T>, get: StoreApi<T>) => T;

export type Store = {
  playing: boolean;
  playingQueue: IMusic[];
  playingMusic: IMusic | null;
  playMusic: (music: IMusic | null) => void;
  togglePlayingMode: (playing: boolean) => void;
  setPlayingQueue: (musics: IMusic[]) => void;
};

export const store = (set: Function, get: Function) => ({
  playing: false,
  playingQueue: [],
  playingMusic: null,
  playMusic: (music: IMusic | null) =>
    set(
      produce((state: Store) => {
        state.playingMusic = music;
        state.playing = true;
      })
    ),
  togglePlayingMode: (playing: boolean) =>
    set(
      produce((state: Store) => {
        state.playing = playing;
      })
    ),
  setPlayingQueue: (musics: IMusic[]) =>
    set(
      produce((state: Store) => {
        state.playingQueue = musics;
      })
    ),
});

export const useStore = create<Store>(store);
