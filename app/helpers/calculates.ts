export function calculateTimeDifference(timestamp: number) {
  // eslint-disable-next-line no-restricted-globals
  const currentTime = Math.floor(Date.now() / 1000);

  const differenceInSeconds = currentTime - timestamp;

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} secs ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} mins ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} days ago`;
  }
}
