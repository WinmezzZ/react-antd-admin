import type { Notice } from '@/interface/layout/notice.interface';
import type { FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Popover, Spin, Tabs, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getNoticeList } from '@/api/layout.api';
import { ReactComponent as NoticeSvg } from '@/assets/header/notice.svg';
import { EventStatus } from '@/interface/layout/notice.interface';
import { useLocale } from '@/locales';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TabPane } = Tabs;

const HeaderNoticeComponent: FC = () => {
  const [visible, setVisible] = useState(false);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const { noticeCount } = useSelector(state => state.user);
  const { formatMessage } = useLocale();

  const noticeListFilter = <T extends Notice['type']>(type: T) => {
    return noticeList.filter(notice => notice.type === type) as Notice<T>[];
  };

  // loads the notices belonging to logged in user
  // and sets loading flag in-process
  const getNotice = async () => {
    setLoading(true);
    const { status, result } = await getNoticeList();

    setLoading(false);
    status && setNoticeList(result);
  };

  useEffect(() => {
    getNotice();
  }, []);

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={`${formatMessage({
              id: 'app.notice.messages',
            })}(${noticeListFilter('notification').length})`}
            key="1"
          >
            <List
              dataSource={noticeListFilter('notification')}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.title}>{item.title}</a>}
                    description={item.datetime}
                  />
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane
            tab={`${formatMessage({
              id: 'app.notice.news',
            })}(${noticeListFilter('message').length})`}
            key="2"
          >
            <List
              dataSource={noticeListFilter('message')}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.title}>{item.title}</a>}
                    description={
                      <div className="notice-description">
                        <div className="notice-description-content">{item.description}</div>
                        <div className="notice-description-datetime">{item.datetime}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={`${formatMessage({
              id: 'app.notice.tasks',
            })}(${noticeListFilter('event').length})`}
            key="3"
          >
            <List
              dataSource={noticeListFilter('event')}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div className="notice-title">
                        <div className="notice-title-content">{item.title}</div>
                        <Tag color={EventStatus[item.status]}>{item.extra}</Tag>
                      </div>
                    }
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );

  return (
    <Popover
      content={tabs}
      overlayClassName="bg-2"
      placement="bottomRight"
      trigger={['click']}
      open={visible}
      onOpenChange={v => setVisible(v)}
      overlayStyle={{
        width: 336,
      }}
    >
      <Tooltip
        title={formatMessage({
          id: 'gloabal.tips.theme.noticeTooltip',
        })}
      >
        <Badge count={noticeCount} overflowCount={999}>
          <span className="notice" id="notice-center">
            <NoticeSvg className="anticon" />
          </span>
        </Badge>
      </Tooltip>
    </Popover>
  );
};

export default HeaderNoticeComponent;
