import { FC } from 'react';
import { Dropdown } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { LocaleFormatter } from '@/locales';
import { useDispatch, useSelector } from 'react-redux';
import { removeTag, removeOtherTag, removeAllTag } from '@/stores/tags-view.store';

const TagsViewAction: FC = () => {
  const { activeTagId } = useSelector(state => state.tagsView);
  const dispatch = useDispatch();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '0',
            onClick: () => dispatch(removeTag(activeTagId)),
            label: <LocaleFormatter id="tagsView.operation.closeCurrent" />,
          },
          {
            key: '1',
            onClick: () => dispatch(removeOtherTag()),
            label: <LocaleFormatter id="tagsView.operation.closeOther" />,
          },
          {
            key: '2',
            onClick: () => dispatch(removeAllTag()),
            label: <LocaleFormatter id="tagsView.operation.closeAll" />,
          },
          {
            key: '3',
            type: 'divider',
          },
          {
            key: '4',
            onClick: () => dispatch(removeOtherTag()),
            label: <LocaleFormatter id="tagsView.operation.dashboard" />,
          },
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
