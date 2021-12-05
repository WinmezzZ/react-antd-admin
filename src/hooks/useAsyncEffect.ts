import { useEffect } from 'react';

type Callback = () => Promise<any>;

type Deps = readonly any[];

/**
 * hook that wraps a callback function inside
 * useEffect hook, triggered everytime dependencies change
 * @param callback callback
 * @param deps dependences
 */
export default function useAsyncEffect(callback: Callback, deps: Deps = []) {
  useEffect(() => {
    callback().catch(e => console.log('useAsyncEffect error:', e));
  }, deps);
}
