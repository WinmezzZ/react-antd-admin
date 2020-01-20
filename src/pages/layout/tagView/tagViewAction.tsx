import React, { FC } from 'react'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const TagsViewAction: FC = () => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0">关闭当前</Menu.Item>
          <Menu.Item key="1">关闭其他</Menu.Item>
          <Menu.Item key="2">关闭所有</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">控制台</Menu.Item>
        </Menu>
      }
    >
      <SettingOutlined style={{ marginRight: 10 }} />
    </Dropdown>
  )
}

export default TagsViewAction
