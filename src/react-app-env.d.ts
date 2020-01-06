/// <reference types="react-scripts" />

declare interface NodeModule {
  hot: {
    accept: (url: string, callback: Function) => void
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
  }
}
