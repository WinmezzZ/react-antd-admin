import { ConfigProvider, Spin } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import { Suspense, useEffect } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { useDispatch, useSelector } from 'react-redux';

import { history, HistoryRouter } from '~/route/history';

import RenderRouter from './route';
import { setGlobalState } from './store/global.store';

// ConfigProvider.config({
//   prefixCls: 'appnode',
//   iconPrefixCls: 'appnode',
// });

const themes = {
  light: '../node_modules/antd/dist/antd.css',
  dark: '../node_modules/antd/dist/antd.dark.css',
};

const App: React.FC = () => {
  const { theme, loading } = useSelector(state => state.global);
  const dispatch = useDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? 'dark' : 'light',
      }),
    );
  };

  /** 初始设置主题 */
  useEffect(() => {
    setTheme(theme === 'dark');
  }, []);

  /** 监听系统主题改变，如果没手动设置过主题时 */
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  return (
    <ConfigProvider componentSize="middle" iconPrefixCls="appnode" locale={zh_CN}>
      <ThemeSwitcherProvider defaultTheme={theme} themeMap={themes}>
        <HistoryRouter history={history}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Spin spinning={loading} className="app-loading-wrapper" tip="加载中..."></Spin>
            <RenderRouter />
          </Suspense>
        </HistoryRouter>
      </ThemeSwitcherProvider>
    </ConfigProvider>
  );
};

export default App;
