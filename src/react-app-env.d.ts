/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }
}

export {}
