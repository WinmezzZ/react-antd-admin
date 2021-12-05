import { Layout, Menu, MenuItemProps, Skeleton } from 'antd';
import { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { MenuList } from '~/interface/common/menu.interface';
import TagsBar from '~/views/layout/tags-bar';

const { Sider, Content } = Layout;

interface LayoutMainPageProps {
  menu: MenuList;
  selectNavSideMenuKey: string;
  onClickMenu?: MenuItemProps['onClick'];
}

export const LayoutMainPage: FC<LayoutMainPageProps> = props => {
  const { menu, onClickMenu, selectNavSideMenuKey } = props;
  const { menuCollaped } = useSelector(state => state.global);

  return (
    <Layout>
      {menu && (
        <Sider trigger={null} collapsible collapsedWidth={0} collapsed={menuCollaped}>
          <Menu onClick={onClickMenu} style={{ height: '100%' }} selectedKeys={[selectNavSideMenuKey]}>
            {menu.map(item => (
              <Menu.Item key={item.path}>{item.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>
      )}
      <Content style={{ padding: 12 }}>
        <Layout>
          <TagsBar />
          <Content>
            <Suspense
              fallback={
                <Skeleton loading={true}>
                  <p>Hello World</p>
                </Skeleton>
              }
            >
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
