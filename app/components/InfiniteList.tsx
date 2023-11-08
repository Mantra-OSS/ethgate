import { useCallback, useEffect, useRef, useState } from 'react';

import EthgateLogo from '../(explorer)/EthgateLogo';

type OperationType = any;
type GraphQLSubscriptionConfig<T> = any;

export default function InfiniteList<T extends OperationType>({
  startSubscriptionConfig,
  loadPrevious,
  loadNext,
  children,
}: {
  startSubscriptionConfig?: GraphQLSubscriptionConfig<T>;
  loadPrevious?: (() => void) | false;
  loadNext?: (() => void) | false;
  children: React.ReactNode;
}) {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [isStartIntersecting, setIsStartIntersecting] = useState(false);
  // const [isEndIntersecting, setIsEndIntersecting] = useState(false);
  const onEntries = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.map((entry) => {
        if (entry.target === startRef.current) {
          setIsStartIntersecting(entry.isIntersecting);
          if (loadPrevious && entry.isIntersecting) {
            loadPrevious();
          }
        }
        if (entry.target === endRef.current) {
          // setIsEndIntersecting(entry.isIntersecting);
          if (loadNext && entry.isIntersecting) {
            loadNext();
          }
        }
      });
    },
    [loadPrevious, loadNext],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onEntries);

    if (startRef.current) {
      observer.observe(startRef.current);
    }
    if (endRef.current) {
      observer.observe(endRef.current);
    }

    observer.takeRecords();

    return () => {
      observer.disconnect();
    };
  }, [onEntries]);

  const shouldSubscribe = startSubscriptionConfig && isStartIntersecting;
  // console.log({ shouldSubscribe });

  return (
    <>
      {/* {shouldSubscribe ? <RelaySubscriber config={startSubscriptionConfig} /> : null} */}
      <div ref={startRef}>{loadPrevious && <EthgateLogo width={40} height={40} isLoading />}</div>
      {children}
      <div ref={endRef}>{loadNext && <EthgateLogo width={40} height={40} isLoading />}</div>
    </>
  );
}
