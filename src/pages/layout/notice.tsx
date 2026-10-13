import type { Notice } from '@/interface/layout/notice.interface';
import type { FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Listy, Popover, Spin, Tabs, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

import { getNoticeList } from '@/api/layout.api';
import NoticeSvg from '@/assets/header/notice.svg?react';
import { EventStatus } from '@/interface/layout/notice.interface';
import { useLocale } from '@/locales';
import { useAppSelector } from '@/stores/hooks';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const HeaderNoticeComponent: FC = () => {
  const [visible, setVisible] = useState(false);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const { noticeCount } = useAppSelector(state => state.user);
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
    if (status) {
      setNoticeList(result);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  const tabs = (
    <div>
      <Spin description="Loading..." indicator={antIcon} spinning={loading}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: `${formatMessage({ id: 'app.notice.messages' })}(${noticeListFilter('notification').length})`,
              children: (
                <Listy
                  items={noticeListFilter('notification')}
                  rowKey="id"
                  itemRender={item => (
                    <div className="notice-list-item">
                      <Avatar src={item.avatar} />
                      <div className="notice-list-content">
                        <a href={item.title}>{item.title}</a>
                        <div>{item.datetime}</div>
                      </div>
                    </div>
                  )}
                />
              ),
            },
            {
              key: '2',
              label: `${formatMessage({ id: 'app.notice.news' })}(${noticeListFilter('message').length})`,
              children: (
                <Listy
                  items={noticeListFilter('message')}
                  rowKey="id"
                  itemRender={item => (
                    <div className="notice-list-item">
                      <Avatar src={item.avatar} />
                      <div className="notice-list-content">
                        <a href={item.title}>{item.title}</a>
                        <div className="notice-description">
                          <div className="notice-description-content">{item.description}</div>
                          <div className="notice-description-datetime">{item.datetime}</div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              ),
            },
            {
              key: '3',
              label: `${formatMessage({ id: 'app.notice.tasks' })}(${noticeListFilter('event').length})`,
              children: (
                <Listy
                  items={noticeListFilter('event')}
                  rowKey="id"
                  itemRender={item => (
                    <div className="notice-list-item">
                      <div className="notice-list-content">
                        <div className="notice-title">
                          <div className="notice-title-content">{item.title}</div>
                          <Tag color={EventStatus[item.status]}>{item.extra}</Tag>
                        </div>
                        <div>{item.description}</div>
                      </div>
                    </div>
                  )}
                />
              ),
            },
          ]}
        />
      </Spin>
    </div>
  );

  return (
    <Popover
      content={tabs}
      classNames={{ root: 'bg-2' }}
      placement="bottomRight"
      trigger={['click']}
      open={visible}
      onOpenChange={v => setVisible(v)}
      styles={{ root: { width: 336 } }}
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
