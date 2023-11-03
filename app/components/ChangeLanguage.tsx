import { Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { viewerStorageState } from '../viewer';

export default function ChangeLanguage() {
  const [viewerStorage, setViewerStorage] = useRecoilState(viewerStorageState);
  const setLanguage = useCallback(
    (locale: string) => {
      setViewerStorage({
        ...viewerStorage,
        locale,
      });
    },
    [viewerStorage, setViewerStorage],
  );
  return (
    <>
      <Button
        variant={viewerStorage.locale === 'en' ? 'outlined' : 'text'}
        onClick={() => setLanguage('en')}
      >
        <Typography variant="h5" textAlign="center">
          En
        </Typography>
      </Button>
      <Button
        variant={viewerStorage.locale === 'tr' ? 'outlined' : 'text'}
        onClick={() => setLanguage('tr')}
      >
        <Typography variant="h5" textAlign="center">
          Tr
        </Typography>
      </Button>
    </>
  );
}
