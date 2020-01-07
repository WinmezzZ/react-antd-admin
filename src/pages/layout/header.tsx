import React, { FC } from 'react'
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import HeaderNoticeComponent from './notice'

const { Header } = Layout

interface Props {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<Props> = ({ collapsed, toggle }) => {
  const router = useHistory()

  const onActionClick = (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        router.push('/login')
    }
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span>个人中心</span>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <SettingOutlined />
          <span>个人设置</span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick('logout')}>退出登录</span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      <span onClick={toggle}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
      <div className="actions">
        <HeaderNoticeComponent />
        <Dropdown overlay={menu}>
          <span className="user-action">
            Admin <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderComponent
