import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeAllTag, removeOtherTag, removeTag } from '~/store/tags-bar.store';

const TagsBarAction: FC = () => {
  const { activeTagId } = useSelector(state => state.tags);
  const dispatch = useDispatch();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => dispatch(removeTag(activeTagId))}>
            关闭当前
          </Menu.Item>
          <Menu.Item key="1" onClick={() => dispatch(removeOtherTag())}>
            关闭其他
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(removeAllTag())}>
            关闭全部
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => dispatch(removeAllTag())}>
            首页
          </Menu.Item>
        </Menu>
      }
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsBarAction;
