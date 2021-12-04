import store from '~/store';

const storeData = store.getState();
const theme = storeData.global.theme;

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

const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

const themeMap = {
  theme,
  borderRadiusBase: '2px',
  ...currentTheme,
};

export default themeMap;
