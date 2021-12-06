import { combineReducers } from '@reduxjs/toolkit';
import tagsViewReducer from './tags-view.store';
import globalReducer from './global.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  tagsView: tagsViewReducer,
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;
