import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JSCookie from 'js-cookie';

interface State {
  CSRFToken?: string;
}

const initialState: State = {
  CSRFToken: JSCookie.get('CSRFToken'),
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
