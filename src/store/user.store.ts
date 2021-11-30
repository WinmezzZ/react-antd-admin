import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JSCookie from 'js-cookie';

import { MenuList } from '~/interface/common/menu.interface';

interface State {
  CSRFToken?: string;
  navMenuList: MenuList;
  sideMenuList: MenuList;
}

const initialState: State = {
  CSRFToken: JSCookie.get('CSRFToken'),
  navMenuList: [],
  sideMenuList: [],
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
