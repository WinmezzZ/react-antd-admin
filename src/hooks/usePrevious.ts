import { useEffect, useRef } from 'react';

/**
 * @param value
 * @returns previous value stored in ref object
 */
export default function usePrevious<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
