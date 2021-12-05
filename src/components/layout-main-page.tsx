import { Layout, Menu, MenuItemProps, Skeleton } from 'antd';
import { FC, Suspense } from 'react';
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

  return (
    <Layout>
      {menu && (
        <Sider>
          <Menu onClick={onClickMenu} style={{ maxWidth: 190, height: '100%' }} selectedKeys={[selectNavSideMenuKey]}>
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
