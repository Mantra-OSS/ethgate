import { useIntervalEffect } from '@react-hookz/web';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { viewerStorageState } from './storage';
import useKonamiCode from './useKonamiCode';
import { isDeveloperState } from './viewer';

function KonamiManager() {
  const setIsDeveloper = useSetRecoilState(isDeveloperState);
  const onKonami = useCallback(() => {
    setIsDeveloper((isDeveloper) => !isDeveloper);
  }, [setIsDeveloper]);
  useKonamiCode(onKonami);
  return null;
}

function TimeManager() {
  const [storage, setStorage] = useRecoilState(viewerStorageState);
  const onTick = useCallback(() => {
    setStorage((storage) => ({
      ...storage,
      now: DateTime.utc().plus({ second: 1 }).startOf('second').toMillis(),
    }));
  }, [setStorage]);
  useIntervalEffect(onTick, storage.nowUpdateFrequency);
  return null;
}

export default function ViewerProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KonamiManager />
      <TimeManager />
      {children}
    </>
  );
}
