import 'server-only';
import { DateTime } from 'luxon';
import { cache } from 'react';

export const getNow = cache(() => {
  return DateTime.now().toMillis();
});
