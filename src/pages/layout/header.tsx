import React, { FC } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import HeaderNoticeComponent from './notice'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from '~/actions/user.action'
import Avator from '~/assets/header/avator.jpeg'
import { AppState } from '~/stores'

const { Header } = Layout

interface Props {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<Props> = ({ collapsed, toggle }) => {
  const { username } = useSelector((state: AppState) => state.userReducer)
  const router = useHistory()
  const dispatch = useDispatch()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()))
        res && router.push('/login')
        return
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
            <img src={Avator} className="user-avator" />
            {username}
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderComponent
