import { useRef, useEffect } from 'react';

export default function usePrevious<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
