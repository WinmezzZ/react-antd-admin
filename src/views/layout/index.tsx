import { css } from '@emotion/react';
import { FileQuestion, Logout, Moon, SettingTwo, Sun, User } from '@icon-park/react';
import { Dropdown, Layout, Menu, Tooltip } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { LayoutMainPage } from '~/components/layout-main-page';
import { panelData } from '~/config/data/panel';
import { MenuList } from '~/interface/common/menu.interface';
import { setGlobalState } from '~/store/global.store';
import { setUserState } from '~/store/user.store';
import { getPanelCode } from '~/utils/getStrTimesIndex';

import NoticeIconView from './header/header-notice';

const { Header } = Layout;

const LayoutPage: FC = () => {
  const { theme } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const visivleNavitems = panelData
    .filter(item => item.ShowInMenu === 'Y')
    .map(item => ({
      title: item.PanelName,
      code: item.PanelCode,
    }));
  const selectNavKey = useMemo(() => {
    return getPanelCode(location.pathname);
  }, [location.pathname]);

  const [navSideMenu, setNavSideMenu] = useState<MenuList>([]);

  const [selectNavSideMenuKey, setSelectNavSideMenuKey] = useState<string>(location.pathname);

  const onClickNav = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    const panel = panelData.find(item => item.PanelCode === selectNavKey);

    if (panel) {
      setNavSideMenu(panel.Menus);
      setSelectNavSideMenuKey(panel.Menus[0].path);
      dispatch(
        setUserState({
          menuList: panel.Menus,
        }),
      );
    }
  }, [selectNavKey]);

  const onSwitchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Layout css={styles}>
      <Header className="appnode-header bg-1">
        <Menu mode="horizontal" selectedKeys={[selectNavKey]} onClick={d => onClickNav(d.key)}>
          {visivleNavitems.map(item => (
            <Menu.Item key={item.code}>{item.title}</Menu.Item>
          ))}
        </Menu>
        <div className="header-icon-wrapper">
          <Tooltip title={`切换到${theme === 'dark' ? '浅色' : '深色'}主题`}>
            <span className="header-icon" onClick={onSwitchTheme}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </span>
          </Tooltip>
          <span className="header-icon">
            <NoticeIconView />
          </span>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="setting" icon={<SettingTwo />}>
                  设置
                </Menu.Item>
                <Menu.Item key="help" icon={<FileQuestion />}>
                  帮助
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" icon={<Logout />}>
                  退出登录
                </Menu.Item>
              </Menu>
            }
          >
            <span className="header-icon">
              <User />
            </span>
          </Dropdown>
        </div>
      </Header>
      <LayoutMainPage
        menu={navSideMenu}
        selectNavSideMenuKey={selectNavSideMenuKey}
        onClickMenu={e => onClickNav(e.key)}
      />
    </Layout>
  );
};

export default LayoutPage;

const styles = css`
  .appnode-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    box-shadow: 0 2px 8px #f0f1f2;
    padding: 0;
    .header-icon-wrapper {
      display: flex;
    }
    .header-icon {
      display: flex;
      margin-right: 40px;
      cursor: pointer;
      .i-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      svg {
        width: 20px;
        height: 20px;
        path {
          stroke-width: 3px;
        }
      }
    }
  }
`;
