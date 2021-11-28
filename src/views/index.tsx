import {
  IconBell,
  IconExit,
  IconHelpCircleStroked,
  IconMoon,
  IconSetting,
  IconSun,
  IconUser,
} from '@douyinfe/semi-icons';
import { Button, Dropdown, Layout, Menu, MenuItemProps, Tooltip, Typography } from 'antd';
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
    key: item.PanelCode,
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

    const menu: MenuItemProps[] = panel.Menus.map(item => ({
      title: item.name,
      key: item.code,
      url: item.url,
    }));

    if (level === 0) {
      console.log(menu[0]);
      setSelectNavKey(key);
      setNavSideMenu(menu);
      setSelectNavSideMenuKey(menu[0].key);
      jump && navigate('/' + key + '/' + menu[0].key);

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
    <Layout>
      <Header>
        <div>
          <Menu mode="horizontal" selectedKeys={[selectNavKey]} onClick={d => onClickNav(d.key, 0)}>
            {navItems.map(item => (
              <Menu.Item key={item.key}>{item.title}</Menu.Item>
            ))}
          </Menu>
          <div>
            <Tooltip title={`切换到${theme === 'dark' ? '浅色' : '深色'}主题`}>
              <Button
                onClick={onSwitchTheme}
                icon={theme === 'light' ? <IconMoon size="large" /> : <IconSun size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
            </Tooltip>
            <Tooltip title="消息通知">
              <Button
                icon={<IconBell size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              />
            </Tooltip>

            <Dropdown
              placement="topLeft"
              overlay={
                <Menu>
                  <Menu.Item icon={<IconSetting />}>设置</Menu.Item>
                  <Menu.Item icon={<IconHelpCircleStroked />}>帮助</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item icon={<IconExit />}>退出登录</Menu.Item>
                </Menu>
              }
            >
              <Button
                icon={<IconUser size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                }}
              />
            </Dropdown>
          </div>
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
