import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import { Button, Dropdown, SplitButtonGroup } from '@douyinfe/semi-ui';
import { Size } from '@douyinfe/semi-ui/lib/es/button';
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';
import { FC, useState } from 'react';

interface DropMenuButtonProps {
  menu: DropDownMenuItem[];
  size?: Size;
  onClick?: () => void;
}

export const DropMenuButton: FC<DropMenuButtonProps> = props => {
  const { menu, children, size, onClick } = props;
  const [btnVisible, setBtnVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setBtnVisible(visible);
  };

  return (
    <SplitButtonGroup style={{ marginRight: 10 }}>
      <Button size={size} theme="solid" type="primary" onClick={onClick}>
        {children}
      </Button>
      <Dropdown onVisibleChange={v => handleVisibleChange(v)} menu={menu} trigger="click" position="bottomRight">
        <Button
          style={
            btnVisible ? { background: 'var(--semi-color-primary-hover)', padding: '8px 4px' } : { padding: '8px 4px' }
          }
          size={size}
          theme="solid"
          type="primary"
          icon={<IconTreeTriangleDown />}
        ></Button>
      </Dropdown>
    </SplitButtonGroup>
  );
};
