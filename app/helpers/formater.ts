import { DateTime } from 'luxon';
import type { GetEnsTextReturnType } from 'viem/actions';

export function formattedAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formattedDate(timestamp: string): string {
  const currentDate = DateTime.now();
  const pastDate = DateTime.fromISO(timestamp);

  const elapsedMilliseconds = currentDate.diff(pastDate).milliseconds;
  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} mounts ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else if (seconds > 0) {
    return `${seconds} seconds ago`;
  } else {
    return 'Now';
  }
}

export function formattedRecordValue(value: GetEnsTextReturnType): string {
  if (value) {
    return value;
  } else {
    return 'Not set';
  }
}
