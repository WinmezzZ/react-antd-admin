import { Layout, Menu, MenuItemProps, Skeleton } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

interface LayoutMainPageProps<T> {
  menu?: T;
  selectNavSideMenuKey: string;
  onClickMenu?: MenuItemProps['onClick'];
  showWrpperStyle?: boolean;
}

type ShouldKeyRequid<T> = T extends MenuItemProps[]
  ? LayoutMainPageProps<T>
  : Omit<LayoutMainPageProps<T>, 'selectNavSideMenuKey'>;

export const LayoutMainPage = <T extends MenuItemProps[] | undefined>(props: ShouldKeyRequid<T>) => {
  const { menu, onClickMenu, showWrpperStyle } = props;

  return (
    <Layout>
      {menu && (
        <Sider>
          <Menu
            onClick={onClickMenu}
            style={{ maxWidth: 190, height: '100%' }}
            defaultSelectedKeys={[props.selectNavSideMenuKey]}
          >
            {menu.map(item => (
              <Menu.Item key={item.eventKey}>{item.title}</Menu.Item>
            ))}
          </Menu>
        </Sider>
      )}
      <Content
        style={
          showWrpperStyle
            ? {
                padding: '24px',
                backgroundColor: 'var(--semi-color-bg-0)',
              }
            : {}
        }
      >
        <div
          style={
            showWrpperStyle
              ? {
                  borderRadius: '10px',
                  border: '1px solid var(--semi-color-border)',
                  height: '376px',
                  padding: '32px',
                }
              : {}
          }
        >
          <Suspense
            fallback={
              <Skeleton loading={true}>
                <p>Hello World</p>
              </Skeleton>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
};

(LayoutMainPage as FC<LayoutMainPageProps<any>>).defaultProps = {
  showWrpperStyle: false,
};
