import { atom } from 'recoil';

import { localStorageEffect } from '../helpers/recoil';

export interface ViewerStorage {
  account: string | null;
  locale: string;
  now: number;
  nowUpdateFrequency?: number;
}

export const viewerStorageState = atom<ViewerStorage>({
  key: 'viewer',
  default: {
    account: null,
    // TODO: Get the default from viewer's browser
    locale: 'en',
    now: 0,
    nowUpdateFrequency: 1000,
  },
  effects: [localStorageEffect('viewer')],
});
