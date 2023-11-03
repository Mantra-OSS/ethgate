import { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { localStorageEffect } from '../helpers/recoil.js';

import { viewerStorageState } from './storage.js';

export interface Viewer {
  account: string | null;
  locale: string;
  isDeveloper: boolean;
  now: number;
  nowUpdateFrequency?: number;
}

export type Notification = {
  type: 'alert';
} & (
  | { severity: 'error'; error: Error }
  | { severity: 'warning'; message: string }
  | { severity: 'info'; message: string }
  | { severity: 'success'; message: string }
);

export type PushNotificationFn = (notification: Notification) => void;

export const notificationsState = atom<Notification[]>({
  key: 'notifications',
  default: [],
});

export const usePushNotification = (): PushNotificationFn => {
  const setNotifications = useSetRecoilState(notificationsState);
  const pushNotification = useCallback(
    (notification: Notification) => {
      setNotifications((notifications) => [...notifications, notification]);
    },
    [setNotifications],
  );
  return pushNotification;
};

export const useOnError = (): ((error: Error) => void) => {
  const pushNotification = usePushNotification();
  const onError = useCallback(
    (error: Error) => {
      pushNotification({ type: 'alert', severity: 'error', error });
    },
    [pushNotification],
  );
  return onError;
};

export const isDeveloperState = atom<boolean>({
  key: 'isDeveloper',
  default: false,
  effects: [localStorageEffect('isDeveloper')],
});

export const useViewer = (): Viewer => {
  const isDeveloper = useRecoilValue(isDeveloperState);
  const storage = useRecoilValue(viewerStorageState);
  const viewer = useMemo(() => ({ ...storage, isDeveloper }), [storage, isDeveloper]);
  return viewer;
};

export const useNow = () => {
  const { now } = useRecoilValue(viewerStorageState);
  const dateTime = useMemo(() => DateTime.fromMillis(now), [now]);
  return dateTime;
};
