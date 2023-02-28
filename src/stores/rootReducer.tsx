import globalReducer from './global.store';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  tagsView: tagsViewReducer,
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;
