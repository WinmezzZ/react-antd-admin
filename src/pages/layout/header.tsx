import React, { FC } from 'react'
import { Layout, Icon, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'

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
          <Icon type="user" />
          <span>个人中心</span>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <Icon type="setting" />
          <span>个人设置</span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <span>
          <Icon type="logout" />
          <span onClick={() => onActionClick('logout')}>退出登录</span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      <Dropdown overlay={menu}>
        <span className="user-action">
          Admin <Icon type="down" />
        </span>
      </Dropdown>
    </Header>
  )
}

export default HeaderComponent
