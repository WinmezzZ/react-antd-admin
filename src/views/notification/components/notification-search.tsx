import { css } from '@emotion/react';
import { Button, DatePicker, Tabs } from 'antd';
import { FC, useState } from 'react';

import { NotificationListParams } from '~/interface/app-notification/notification.interface';

interface NotificationSearchProps {
  onChange: (params: NotificationListParams) => void;
}

const tabMap = {
  '0': '未读通知',
  '1': '已读通知',
};

type TabKeys = keyof typeof tabMap;

const NotificationSearch: FC<NotificationSearchProps> = ({ onChange }) => {
  const [tab, setTab] = useState<TabKeys>('0');

  const onTabClick = (value: string) => {
    setTab(value as TabKeys);
    onChange({
      IsRead: value === '0' ? 'N' : 'Y',
    });
  };

  return (
    <div css={styles}>
      <Tabs defaultValue={tab} onTabClick={onTabClick} tabBarExtraContent={<Button>清理通知</Button>}>
        {Object.keys(tabMap).map(item => (
          <Tabs.TabPane key={item} tabKey={item} tab={tabMap[item]}></Tabs.TabPane>
        ))}
      </Tabs>

      <div className="search">
        <DatePicker.RangePicker onChange={value => onChange({ CreateTime: value })} />
        <Button type="primary">搜索</Button>
      </div>
      {tab === '0' && (
        <div className="operate">
          <Button type="primary">标为已读</Button>
          <Button type="primary">全部设为已读</Button>
          <Button type="primary">删除选中项</Button>
        </div>
      )}
    </div>
  );
};

export default NotificationSearch;

const styles = css`
  .search {
    margin-bottom: 20px;
    .ant-btn {
      margin-left: 20px;
    }
  }
  .operate {
    margin-bottom: 20px;
    .ant-btn {
      margin-right: 20px;
    }
  }
`;
