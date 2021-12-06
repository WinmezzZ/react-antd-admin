import { FC } from 'react';
import { Menu } from 'antd';
import { MenuList } from '../../interface/layout/menu.interface';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from './customIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItem } from '@/stores/user.store';

const { SubMenu, Item } = Menu;

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device, locale } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label[locale]}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
    >
      {menuList.map(menu =>
        menu.children ? (
          <SubMenu key={menu.code} title={getTitie(menu)}>
            {menu.children.map(child => (
              <Item key={child.path}>{child.label[locale]}</Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path}>{getTitie(menu)}</Item>
        ),
      )}
    </Menu>
  );
};

export default MenuComponent;
