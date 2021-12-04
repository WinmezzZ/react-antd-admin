import store, { AppState } from '~/store';
import themeMap from '~/style/theme';

const state = store.getState();

interface ThemeCallback<T> {
  (theme: typeof themeMap, store: AppState): T;
}

export function withTheme<T>(fn: ThemeCallback<T>) {
  {
    const cssData = fn(themeMap, state);

    return cssData;
  }
}
