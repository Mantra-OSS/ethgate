'use client';
import { DateTime } from 'luxon';
import { createContext, startTransition, use, useEffect, useMemo, useState } from 'react';

const context = createContext<number | undefined>(undefined);

export function NowProvider({
  initialValue,
  children,
}: {
  initialValue: number;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    let aborted = false;

    const onTick = () => {
      if (aborted) {
        return;
      }
      const value = DateTime.utc().plus({ second: 1 }).startOf('second').toMillis();
      startTransition(() => {
        setValue(value);
      });
    };

    const interval = setInterval(onTick, 1000);

    return () => {
      clearInterval(interval);
      aborted = true;
    };
  });
  return <context.Provider value={value}>{children}</context.Provider>;
}
export const useNow = () => {
  const now = use(context);
  if (!now) {
    throw new Error('useNow() must be used inside a NowProvider');
  }
  const dateTime = useMemo(() => DateTime.fromMillis(now), [now]);
  return dateTime;
};
