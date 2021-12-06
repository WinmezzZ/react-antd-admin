import { FC, useState, useEffect } from 'react';
import { Tabs, Dropdown, Badge, Spin, List, Avatar, Tag, Tooltip } from 'antd';
import { ReactComponent as NoticeSvg } from '@/assets/header/notice.svg';
import { LoadingOutlined } from '@ant-design/icons';
import { getNoticeList } from '@/api/layout.api';
import { Notice, EventStatus } from '@/interface/layout/notice.interface';
import { useSelector } from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { TabPane } = Tabs;

const HeaderNoticeComponent: FC = () => {
  const [visible, setVisible] = useState(false);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const { noticeCount } = useSelector(state => state.user);

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
          <TabPane tab={`通知(${noticeListFilter('notification').length})`} key="1">
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

          <TabPane tab={`消息(${noticeListFilter('message').length})`} key="2">
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
          <TabPane tab={`待办(${noticeListFilter('event').length})`} key="3">
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
    <Dropdown
      overlay={tabs}
      overlayClassName="bg-2"
      placement="bottomRight"
      trigger={['click']}
      visible={visible}
      onVisibleChange={v => setVisible(v)}
      overlayStyle={{
        width: 336,
        boxShadow:
          'box-shadow: 0 6px 16px -8px rgb(0 0 0 / 8%), 0 9px 28px 0 rgb(0 0 0 / 5%), 0 12px 48px 16px rgb(0 0 0 / 3%)',
        padding: 8,
        borderRadius: 4,
      }}
    >
      <Tooltip title="通知">
        <Badge count={noticeCount} overflowCount={999}>
          <span className="notice" id="notice-center">
            <NoticeSvg className="anticon" />
          </span>
        </Badge>
      </Tooltip>
    </Dropdown>
  );
};

export default HeaderNoticeComponent;
