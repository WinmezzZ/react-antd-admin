import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuItemProps } from 'antd';
import { FC } from 'react';

interface DropMenuButtonProps {
  menu: MenuItemProps[];
  onClick?: () => void;
}

export const DropMenuButton: FC<DropMenuButtonProps> = props => {
  const { menu, onClick, children } = props;

  return (
    <Dropdown.Button
      size="small"
      trigger={['click']}
      placement="bottomRight"
      icon={<DownOutlined />}
      onClick={onClick}
      overlay={
        <Menu>
          {menu.map(item => (
            <Menu.Item key={item.eventKey}>{item.title}</Menu.Item>
          ))}
        </Menu>
      }
    >
      {children}
    </Dropdown.Button>
  );
};
