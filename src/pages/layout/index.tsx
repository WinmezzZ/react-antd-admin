import type { MenuChild, MenuList } from '@/interface/layout/menu.interface';
import type { FC } from 'react';
import type { LoadingBarRef } from 'react-top-loading-bar';

import './index.less';

import { Drawer, Layout, theme as antTheme } from 'antd';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import { getMenuList } from '@/api/layout.api';
import { setUserItem } from '@/stores/user.store';
import { getGlobalState } from '@/utils/getGloabal';

import { useGuide } from '../guide/useGuide';
import HeaderComponent from './header';
import MenuComponent from './menu';
import TagsView from './tagView';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser } = useSelector(state => state.user);
  const token = antTheme.useToken();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loadingBarRef.current) return;
    navigation.state === 'loading' ? loadingBarRef.current.continuousStart() : loadingBarRef.current.complete();
  }, [navigation.state]);

  const isMobile = device === 'MOBILE';
  const dispatch = useDispatch();
  const { driverStart } = useGuide();

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    const { status, result } = await getMenuList();

    console.log(result);

    if (status) {
      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result),
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
      <LoadingBar color="#f11946" ref={loadingBarRef} />
    </Layout>
  );
};

export default LayoutPage;
