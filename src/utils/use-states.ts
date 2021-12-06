import { useState } from 'react';

export function useStates<T extends object>(initialState: T): [T, (state: Partial<T>) => void] {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: Partial<T>) => setState(prevState => Object.assign({}, prevState, newState));

  return [state, setMergedState];
}
