import { Button, DatePicker, Tabs } from 'antd';
import { FC } from 'react';

interface NotificationSearchProps {}

const NotificationSearch: FC<NotificationSearchProps> = () => {
  return (
    <Tabs tabBarExtraContent={<Button>清理通知</Button>}>
      <Tabs.TabPane tab="未读通知">
        <div>
          <DatePicker.RangePicker />
          <Button type="primary">搜索</Button>
        </div>
        <div>
          <Button type="primary">标为已读</Button>
          <Button type="primary">全部设为已读</Button>
          <Button type="primary">删除选中项</Button>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="已读通知"></Tabs.TabPane>
    </Tabs>
  );
};

export default NotificationSearch;
