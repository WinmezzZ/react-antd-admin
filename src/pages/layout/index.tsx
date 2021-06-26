import { FC, useEffect, Suspense, useCallback, useState } from 'react';
import { Layout, Drawer } from 'antd';
import './index.less';
import MenuComponent from './menu';
import HeaderComponent from './header';
import { getGlobalState } from 'utils/getGloabal';
import TagsView from './tagView';
import SuspendFallbackLoading from './suspendFallbackLoading';
import { getMenuList } from 'api/layout.api';
import { MenuList, MenuChild } from 'interface/layout/menu.interface';
import { useGuide } from '../guide/useGuide';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { setUserItem } from 'stores/user.store';
import { useAppDispatch, useAppState } from 'stores';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser } = useAppState(state => state.user);
  const isMobile = device === 'MOBILE';
  const dispatch = useAppDispatch();
  const { driverStart } = useGuide();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed
      })
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
    if (status) {
      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result)
        })
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
          collapsed: needCollapse
        })
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider className="layout-page-sider" trigger={null} collapsible collapsed={collapsed} breakpoint="md">
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense
            fallback={
              <SuspendFallbackLoading
                message="Alert message title"
                description="Further details about the context of this alert."
              />
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
