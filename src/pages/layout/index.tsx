import React, { FC, useEffect, Suspense, useCallback, useState } from 'react'
import { Layout, Drawer, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { AppState } from '~/stores'
import { setGlobalItem } from '~/actions/global.action'
import MenuComponent from './menu'
import HeaderComponent from './header'
import MainRoutes from '~/routes'
import { getGlobalState } from '~/utils/getGloabal'
import TagsView from './tagView'
import SuspendFallbackLoading from './suspendFallbackLoading'
import { getMenuList } from '~/api/layout.api'
import { MenuList, MenuChild } from '~/interface/layout/menu.interface'
import { setUserItem } from '~/actions/user.action'
import ThemeSwitch from './themeSwitch'
import { useGuide } from '../guide/useGuide'

const { Text } = Typography
const { Sider, Content, Footer } = Layout
const WIDTH = 992

const LayoutPage: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])
  const { device, collapsed, newUser } = useSelector((state: AppState) => state.globalReducer)
  const isMobile = device === 'MOBILE'
  const dispatch = useDispatch()
  const { driverStart } = useGuide()

  const toggle = () => {
    dispatch(
      setGlobalItem({
        collapsed: !collapsed
      })
    )
  }

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = []
    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m)
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu)
        })
      }
    })
    return MenuListAll
  }

  const fetchMenuList = useCallback(async () => {
    const { status, result } = await getMenuList()
    if (status) {
      setMenuList(result)
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result)
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    fetchMenuList()
  }, [fetchMenuList])

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState()
      const rect = document.body.getBoundingClientRect()
      const needCollapse = rect.width < WIDTH
      dispatch(
        setGlobalItem({
          device,
          collapsed: needCollapse
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    newUser && driverStart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser])

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider className="layout-page-sider" trigger={null} collapsible collapsed={collapsed} breakpoint="md">
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={<SuspendFallbackLoading />}>
            <MainRoutes />
          </Suspense>
          <ThemeSwitch />
        </Content>
      </Layout>
      <Footer className="layout-page-footer">
        <Text>
          github:{' '}
          <a
            style={{ color: 'royalblue' }}
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/WinmezzZ/react-antd-admin"
          >
            https://github.com/WinmezzZ/react-antd-admin
          </a>
        </Text>
        <br />
        <Text>赣ICP备18008240号 | Copyright © 2019 - 2020 </Text>
      </Footer>
    </Layout>
  )
}

export default LayoutPage
