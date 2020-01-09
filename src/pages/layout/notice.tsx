import React, { FC, useState, useEffect } from 'react'
import { Tabs, Dropdown, Badge, Spin, List, Avatar } from 'antd'
import { ReactComponent as NoticeSvg } from '~/assets/header/notice.svg'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { getNoticeList } from '~/api/layout.api'
import { Notice } from '~/interface/layout/notice.interface'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const { TabPane } = Tabs

const HeaderNoticeComponent: FC = () => {
  const [visible, setVisible] = useState(false)
  const [noticeList, setNoticeList] = useState<Notice[]>([])
  const [loading, setLoading] = useState(false)
  const { noticeCount } = useSelector((state: AppState) => state.globalReducer)

  const noticeListFilter = <T extends Notice['type']>(type: T): Notice<T>[] => {
    return noticeList.filter(notice => notice.type === type) as Notice<T>[]
  }

  const getNotice = async () => {
    setLoading(true)
    const { status, result } = await getNoticeList()
    setLoading(false)
    status && setNoticeList(result)
  }

  useEffect(() => {
    getNotice()
  }, [])

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="notification" key="1">
            <List
              itemLayout="horizontal"
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

          <TabPane tab="message" key="2">
            <List
              itemLayout="horizontal"
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
            />
          </TabPane>
          <TabPane tab="event" key="3">
            <List
              itemLayout="horizontal"
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
        </Tabs>
      </Spin>
    </div>
  )
  return (
    <Dropdown overlay={tabs} trigger={['click']} visible={visible} onVisibleChange={v => setVisible(v)}>
      <Badge count={noticeCount} overflowCount={999}>
        <span className="notice">
          <NoticeSvg className="anticon" />
        </span>
      </Badge>
    </Dropdown>
  )
}

export default HeaderNoticeComponent
