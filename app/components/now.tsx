'use client';
import { DateTime } from 'luxon';
import { createContext, use, useMemo } from 'react';

const now = DateTime.now().toMillis();
const context = createContext(now);
export const NowProvider = context.Provider;
export const useNow = () => {
  const now = use(context);
  const dateTime = useMemo(() => DateTime.fromMillis(now), [now]);
  return dateTime;
};
