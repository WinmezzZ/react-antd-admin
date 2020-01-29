import React, { FC } from 'react'
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import HeaderNoticeComponent from './notice'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from '~/actions/user.action'
import Avator from '~/assets/header/avator.jpeg'
import { AppState } from '~/stores'
import { ReactComponent as LanguageSvg } from '~/assets/header/language.svg'
import { ReactComponent as ZhCnSvg } from '~/assets/header/zh_CN.svg'
import { ReactComponent as EnUsSvg } from '~/assets/header/en_US.svg'
import { setGlobalItem } from '~/actions/global.action'
import { LocaleFormatter } from '~/locales'

const { Header } = Layout

interface Props {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<Props> = ({ collapsed, toggle }) => {
  const { username } = useSelector((state: AppState) => state.userReducer)
  const { locale } = useSelector((state: AppState) => state.globalReducer)
  const history = useHistory()
  const dispatch = useDispatch()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()))
        res && history.push('/login')
        return
    }
  }

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setGlobalItem({ locale: key }))
    localStorage.setItem('locale', key)
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => history.push('/dashboard')}>
            <LocaleFormatter id="header.avator.account" />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick('logout')}>
            <LocaleFormatter id="header.avator.logout" />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="layout-page-header">
      <span onClick={toggle}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
      <div className="actions">
        <HeaderNoticeComponent />
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu onClick={selectLocale}>
              <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'zh_CN'} key="zh_CN">
                <ZhCnSvg /> 简体中文
              </Menu.Item>
              <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'en_US'} key="en_US">
                <EnUsSvg /> English
              </Menu.Item>
            </Menu>
          }
        >
          <LanguageSvg />
        </Dropdown>
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
