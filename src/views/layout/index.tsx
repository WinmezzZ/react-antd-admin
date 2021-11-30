import { css } from '@emotion/react';
import { FileQuestion, Logout, Moon, Remind, SettingTwo, Sun, User } from '@icon-park/react';
import { Dropdown, Layout, Menu, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { LayoutMainPage } from '~/components/layout-main-page';
import { panelData } from '~/config/data/panel';
import { MenuList } from '~/interface/common/menu.interface';
import { setGlobalState } from '~/store/global.store';
import { setUserState } from '~/store/user.store';
import { getPanelCode } from '~/utils/getStrTimesIndex';

const { Header } = Layout;

const LayoutPage: FC = () => {
  const { theme } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = panelData.map(item => ({
    title: item.PanelName,
    code: item.PanelCode,
  }));
  const [selectNavKey, setSelectNavKey] = useState(() => getPanelCode(location.pathname));
  const [navSideMenu, setNavSideMenu] = useState<MenuList>([]);

  const [selectNavSideMenuKey, setSelectNavSideMenuKey] = useState<string>(location.pathname);

  useEffect(() => {
    onClickNav(selectNavKey, 0, false);
  }, []);

  const onClickNav = (key: string, level: number, jump = true) => {
    const panel = panelData.find(item => item.PanelCode === (level === 0 ? key : selectNavKey));

    if (!panel) return;

    const menu = panel.Menus;

    // dispatch(
    //   setUserState({
    //     navMenuList: menu.map(item => ({
    //       key: item.eventKey,
    //       title: item.title,
    //       path: item.eventKey,
    //     })),
    //   }),
    // );

    setSelectNavKey(getPanelCode(key));
    setNavSideMenu(menu);
    setSelectNavSideMenuKey(menu[0].code);

    const activePanel = panelData.find(item => item.PanelCode === key);

    if (activePanel) {
      dispatch(
        setUserState({
          menuList: activePanel.Menus,
        }),
      );
    }

    console.log(key);

    jump && navigate(key);
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
            <Menu.Item key={item.code}>{item.title}</Menu.Item>
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
