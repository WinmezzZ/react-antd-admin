/// <reference types="react-scripts" />
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  less: {
    modifyVars: (arg: any) => Promise<any>
  }
}
