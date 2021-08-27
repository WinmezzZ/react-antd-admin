import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { localeConfig } from './locales';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RenderRouter from './routes';
import { useAppState } from 'stores';
import { history, HistoryRouter } from 'routes/history';

const App: React.FC = () => {
  const { locale } = useAppState(state => state.user);

  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (locale === 'en_US') {
      moment.locale('en');
    } else if (locale === 'zh_CN') {
      moment.locale('zh-cn');
    }
  }, [locale]);

  /**
   * handler function that passes locale
   * information to ConfigProvider for
   * setting language across text components
   */
  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS;
    } else if (locale === 'zh_CN') {
      return zhCN;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <HistoryRouter history={history}>
          <RenderRouter />
        </HistoryRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
