import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  theme: 'light' | 'dark';
  loading: boolean;
  menuCollaped: boolean;
  isMobile: boolean;
}

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const userTheme = localStorage.getItem('theme') as State['theme'];

const isMobile = window.innerWidth <= 500;

const initialState: State = {
  theme: userTheme || systemTheme,
  loading: false,
  menuCollaped: isMobile,
  isMobile: isMobile,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);

      if (action.payload.theme) {
        const body = document.body;

        if (action.payload.theme === 'dark') {
          if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
          }
        } else {
          if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
          }
        }
      }
    },
  },
});

export const { setGlobalState } = globalSlice.actions;

export default globalSlice.reducer;
