/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

declare module '@emotion/core/jsx-runtime';
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

declare interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
}
