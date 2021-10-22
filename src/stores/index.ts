import { configureStore, Dispatch } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppStore = typeof store;

type ThunkAction<T = any> = (dispatch: Dispatch, state: AppStore['getState']) => Promise<T>;

export const createAsyncAction = <T = any, R = any>(cb: (arg: T) => ThunkAction<R>) => {
  return cb;
};
