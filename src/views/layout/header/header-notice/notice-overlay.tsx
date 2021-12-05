import { css } from '@emotion/react';
import { Avatar, Button, List, Tabs, TabsProps } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { NotificationLevelEnum } from '~/config/enum/notification-level.enum';
import { Notification } from '~/interface/app-notification/notification.interface';
import themeMap from '~/style/theme';

import { Level } from '.';

const tabs = Object.keys(NotificationLevelEnum);

const color: Record<Level, string> = {
  info: 'green',
  warning: 'orange',
  error: 'brown',
  critical: '#f00',
};

interface NoticeListProps {
  list: Notification[];
  active?: Level;
  onChangeTab: (tab: Level) => void;
  onVisibleChange: (visible: boolean) => void;
}

const NoticeList: FC<NoticeListProps> = props => {
  const { list, onChangeTab, onVisibleChange, active } = props;

  const navigate = useNavigate();

  const onTabClick: TabsProps['onTabClick'] = item => {
    onChangeTab((item === 'null' ? undefined : item) as any);
  };
  const onClickItem = (item: Notification) => {
    console.log(item);
  };

  const onClear = () => {
    //
  };

  const onViewMore = () => {
    onVisibleChange(false);
    navigate('/notification');
  };

  return (
    <div css={styles}>
      <Tabs onTabClick={onTabClick} activeKey={active}>
        <Tabs.TabPane key={undefined} tabKey={undefined} tab="全部" />
        {tabs.map(item => (
          <Tabs.TabPane key={item} tabKey={item} tab={NotificationLevelEnum[item]} />
        ))}
      </Tabs>
      <List
        dataSource={list}
        renderItem={item => {
          return (
            <List.Item
              className="item"
              key={item.NotificationId}
              onClick={() => onClickItem(item)}
              extra={
                <Button className="read" block type="link">
                  标为已读
                </Button>
              }
            >
              <List.Item.Meta
                avatar={active ? null : <Avatar style={{ backgroundColor: color[item.Level] }}>{item.Level}</Avatar>}
                title={`${item.NodeName} ${item.AppName}`}
                description={
                  <div>
                    <div className="description">{item.Title}</div>
                    <div className="datetime">{moment(item.CreateTime).format('YYYY-MM-DD HH:MM:SS')}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className="bottomBar">
        <div onClick={onClear}>清空</div>
        <div onClick={onViewMore}>查看更多</div>
      </div>
    </div>
  );
};

export default NoticeList;

const styles = css`
  width: 336px;
  border-radius: 4px;
  box-shadow: 0 6px 16px -8px rgb(0 0 0 / 8%), 0 9px 28px 0 rgb(0 0 0 / 5%), 0 12px 48px 16px rgb(0 0 0 / 3%);
  .ant-tabs-nav-list {
    margin: auto;
  }

  .ant-list-item-meta-title {
    font-weight: 400;
  }

  .ant-tabs-tab {
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    outline: none;
  }

  .bottomBar {
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-top: 1px solid ${themeMap.borderColor.primary};
    border-radius: 0 0 ${themeMap.borderRadiusBase} ${themeMap.borderRadiusBase};
    transition: all 0.3s;
    div {
      display: inline-block;
      width: 50%;
      cursor: pointer;
      transition: all 0.3s;
      user-select: none;

      &:only-child {
        width: 100%;
      }
      &:not(:only-child):last-child {
        border-left: 1px solid ${themeMap.borderColor.primary};
      }
    }
  }
  .item {
    padding-right: 24px;
    padding-left: 24px;
    overflow: hidden;
    cursor: pointer;
  }
  .description {
    font-size: 12px;
  }
  .datetime {
    margin-top: 4px;
    font-size: 12px;
  }
  .read {
    width: 60px;
  }
`;
