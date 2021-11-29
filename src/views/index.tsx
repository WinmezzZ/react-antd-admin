import { css } from '@emotion/react';
import { FileQuestion, Logout, Moon, Remind, SettingTwo, Sun, User } from '@icon-park/react';
import { Dropdown, Layout, Menu, MenuItemProps, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { LayoutMainPage } from '~/components/layout-main-page';
import { panelData } from '~/config/data/panel';
import { setGlobalState } from '~/store/global.store';
import { getStrTimesIndex } from '~/utils/getStrTimesIndex';

const { Header } = Layout;

const LayoutPage: FC = () => {
  const { theme } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navItems: MenuItemProps[] = panelData.map(item => ({
    title: item.PanelName,
    eventKey: item.PanelCode,
  }));
  const [selectNavKey, setSelectNavKey] = useState<string>(() => {
    const index0 = getStrTimesIndex(location.pathname, '/', 0);
    const index1 = getStrTimesIndex(location.pathname, '/', 1);
    const activeKey = location.pathname.slice(index0 + 1, index1 > 0 ? index1 : location.pathname.length);

    return activeKey;
  });
  const [navSideMenu, setNavSideMenu] = useState<MenuItemProps[]>([]);

  const [selectNavSideMenuKey, setSelectNavSideMenuKey] = useState<string>(() => {
    const index1 = getStrTimesIndex(location.pathname, '/', 1);
    const index2 = getStrTimesIndex(location.pathname, '/', 2);
    const activeKey = location.pathname.slice(index1 + 1, index2 > 0 ? index1 : location.pathname.length);

    return activeKey;
  });

  useEffect(() => {
    onClickNav(selectNavKey, 0, false);
  }, []);

  const onClickNav = (key: string, level: number, jump = true) => {
    const panel = panelData.find(item => item.PanelCode === (level === 0 ? key : selectNavKey));

    if (!panel) return;

    const menu = panel.Menus.map(item => ({
      title: item.name,
      eventKey: item.code,
    }));

    if (level === 0) {
      console.log(menu[0]);
      setSelectNavKey(key);
      setNavSideMenu(menu);
      setSelectNavSideMenuKey(menu[0].eventKey);
      jump && navigate('/' + key + '/' + menu[0].eventKey);

      return;
    }

    if (level === 1) {
      setSelectNavSideMenuKey(key);
      const level1Url = '/' + selectNavKey;
      const level2Url = `/${key}`;

      jump && navigate(level1Url + level2Url);
    }
  };

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
        <Menu mode="horizontal" selectedKeys={[selectNavKey]} onClick={d => onClickNav(d.key, 0)}>
          {navItems.map(item => (
            <Menu.Item key={item.eventKey}>{item.title}</Menu.Item>
          ))}
        </Menu>
        <div className="header-icon-wrapper">
          <Tooltip title={`切换到${theme === 'dark' ? '浅色' : '深色'}主题`}>
            <span className="header-icon" onClick={onSwitchTheme}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </span>
          </Tooltip>
          <Tooltip title="消息通知">
            <span className="header-icon">
              <Remind />
            </span>
          </Tooltip>

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
        onClickMenu={e => onClickNav(e.key, 1)}
        showWrpperStyle
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
      margin-right: 30px;
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
