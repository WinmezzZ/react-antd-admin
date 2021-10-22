/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

import { AppState } from './stores';

declare module '@emotion/core/jsx-runtime';
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

declare interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
}

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}
