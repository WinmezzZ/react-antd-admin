/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

import { AppState } from './store';

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}

declare global {
  export type YN = 'Y' | 'N';

  declare interface ObjectConstructor {
    keys<T>(o: T): (keyof T)[];
  }
}
