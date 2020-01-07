import React, { FC } from 'react'
import { Tabs, Dropdown, Badge } from 'antd'
import { ReactComponent as NoticeSvg } from '~/assets/header/notice.svg'

const { TabPane } = Tabs

const HeaderNoticeComponent: FC = () => {
  return (
    <Dropdown
      overlay={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      }
      trigger={['click']}
    >
      <Badge count={9} overflowCount={999}>
        <span className="notice">
          <NoticeSvg className="anticon" />
        </span>
      </Badge>
    </Dropdown>
  )
}

export default HeaderNoticeComponent
