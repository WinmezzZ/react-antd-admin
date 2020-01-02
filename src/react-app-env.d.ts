/// <reference types="react-scripts" />

declare interface NodeModule {
  hot: {
    accept: (url: string, callback: Function) => void
  }
}
