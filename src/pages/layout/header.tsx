import { createElement, FC } from 'react';
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Dropdown, Menu, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderNoticeComponent from './notice';
import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import ReactSvg from '@/assets/logo/react.svg';
import AntdSvg from '@/assets/logo/antd.svg';
import { logoutAsync, setUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => navigate('/dashboard')}>
            <LocaleFormatter id="header.avator.account" />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick('logout')}>
            <LocaleFormatter id="header.avator.logout" />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="layout-page-header bg-2">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>
          <HeaderNoticeComponent />
          <Dropdown
            overlay={
              <Menu onClick={selectLocale}>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'zh_CN'} key="zh_CN">
                  <ZhCnSvg /> 简体中文
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'en_US'} key="en_US">
                  <EnUsSvg /> English
                </Menu.Item>
              </Menu>
            }
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown>
          {logged ? (
            <Dropdown overlay={menu}>
              <span className="user-action">
                <img src={Avator} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
