import type { FC } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { LocaleFormatter } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { removeAllTag, removeOtherTag, removeTag } from '@/stores/tags-view.store';

const TagsViewAction: FC = () => {
  const { activeTagId } = useAppSelector(state => state.tagsView);
  const dispatch = useAppDispatch();

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
            label: (
              <Link to="/">
                <LocaleFormatter id="tagsView.operation.dashboard" />
              </Link>
            ),
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
