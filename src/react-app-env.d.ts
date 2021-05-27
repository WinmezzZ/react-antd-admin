/// <reference types="react-scripts" />

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

declare interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

type ObjectKeys<T extends object> = (keyof T)[];
