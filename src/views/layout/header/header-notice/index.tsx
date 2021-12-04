import { Remind } from '@icon-park/react';
import { Badge, Dropdown } from 'antd';
import { FC, useState } from 'react';

import { apiNotificationList } from '~/api/app-notification/notification.api';
import { NotificationLevelEnum } from '~/config/enum/notification-level.enum';
import { usePagination } from '~/hooks/usePagination';

import NoticeList from './notice-overlay';

export type Level = keyof typeof NotificationLevelEnum;

const HeaderNotice: FC = () => {
  const [tab, setTab] = useState<Level | undefined>(undefined);

  const { panination, tableData, reload } = usePagination({
    apiMethod: apiNotificationList,
    apiParams: {
      Level: tab,
      _pageSize: 5,
    },
    resultListKeyPath: 'NotificationList',
  });

  const onChangeTab = (tab: Level) => {
    setTab(tab);
    reload({
      params: {
        Level: tab,
      },
    });
  };

  return (
    <Dropdown
      overlayClassName="bg-2"
      trigger={['click']}
      placement="bottomRight"
      overlay={<NoticeList list={tableData} onChangeTab={onChangeTab} />}
    >
      <Badge offset={[15, 0]} count={panination.total}>
        <Remind />
      </Badge>
    </Dropdown>
  );
};

export default HeaderNotice;
