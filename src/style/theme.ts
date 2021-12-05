import store from '~/store';

const light_1 = '#fff !important';
const dark_1 = '#000 !important';
const dark_2 = '#1f1f1f !important';

const lightTheme = {
  background: {
    primary: light_1,
    second: light_1,
  },
  borderColor: {
    primary: '#f0f0f0',
  },
};

const darkTheme = {
  background: {
    primary: dark_1,
    second: dark_2,
  },
  borderColor: {
    primary: '#303030',
  },
};

let currentThemeMap = lightTheme;
let currentTheme = 'light';

store.subscribe(() => {
  const theme = store.getState().global.theme;

  currentThemeMap = theme === 'dark' ? darkTheme : lightTheme;
  currentTheme = theme;
});

const themeMap = {
  theme: currentTheme,
  primaryColor: '#1890ff',
  borderRadiusBase: '2px',
  ...currentThemeMap,
};

export default themeMap;
