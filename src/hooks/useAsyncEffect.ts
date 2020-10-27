import { useEffect } from 'react';

type Callback = () => Promise<any>;

type Deps = readonly any[];

/**
 *
 * @param callback callback
 * @param deps dependences
 */
export default function useAsyncEffect(callback: Callback, deps: Deps = []) {
  useEffect(() => {
    callback().catch(e => console.log('useAsyncEffect error:', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
