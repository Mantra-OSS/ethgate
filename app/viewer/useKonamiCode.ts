import { useCallback, useEffect, useState } from 'react';

// https://en.wikipedia.org/wiki/Konami_Code
const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function useKonamiCode(callback: () => void) {
  const [progress, setProgress] = useState(0);

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      // Reset progress if keyCode is not what we expected
      if (event.key !== konamiCode[progress]) {
        if (progress > 0) {
          setProgress(0);
        }
        return;
      }

      // Reset and call the callback if we are done
      if (progress === konamiCode.length - 1) {
        setProgress(0);
        callback();
        return;
      }

      // Progress
      setProgress(progress + 1);
    },
    [progress, callback],
  );

  useEffect(() => {
    window.document.addEventListener('keyup', onKeyUp);
    return () => {
      window.document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);
}
