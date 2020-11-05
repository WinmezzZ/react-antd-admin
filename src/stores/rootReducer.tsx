import { combineReducers } from '@reduxjs/toolkit';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  tagsView: tagsViewReducer,
  user: userReducer
});

export default rootReducer;
