import type { FC } from 'react';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import EnUsSvg from '@/assets/header/en_US.svg?react';
import LanguageSvg from '@/assets/header/language.svg?react';
import MoonSvg from '@/assets/header/moon.svg?react';
import SunSvg from '@/assets/header/sun.svg?react';
import ZhCnSvg from '@/assets/header/zh_CN.svg?react';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';
import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useAppDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        if (res) {
          navigate('/login');
        }

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

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
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
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: '简体中文',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown>

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/dashboard')}>
                        <LocaleFormatter id="header.avator.account" />
                      </span>
                    ),
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </span>
                    ),
                  },
                ],
              }}
            >
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
