import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JSCookie from 'js-cookie';

import { MenuList } from '~/interface/common/menu.interface';

interface State {
  isLogin: boolean;
  CSRFToken?: string;
  menuList: MenuList;
}

const initialState: State = {
  isLogin: false,
  CSRFToken: JSCookie.get('CSRFToken'),
  menuList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
