/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

import { AppState } from './store';

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}

declare interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
}

declare global {
  export type YN = 'Y' | 'N';
}
