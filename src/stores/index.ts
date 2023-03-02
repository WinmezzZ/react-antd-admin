import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppStore = typeof store;
