import React, { FC, useEffect, Suspense, useCallback, useState } from 'react'
import { Layout, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './index.less'
import { AppState } from '~/stores'
import { setGlobalItem } from '~/actions/global.action'
import MenuComponent from './menu'
import HeaderComponent from './header'
import ReactSvg from '~/assets/logo/react.svg'
import AntdSvg from '~/assets/logo/antd.svg'
import MainRoutes from '~/routes'
import { getGlobalState } from '~/utils/getGloabal'
import TagsView from './tagView'
import SuspendFallbackLoading from './suspendFallbackLoading'
import { getMenuList } from '~/api/layout.api'
import { MenuList, MenuChild } from '~/interface/layout/menu.interface'
import { setUserItem } from '~/actions/user.action'

const { Sider, Content } = Layout
const WIDTH = 992

const LayoutPage: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])
  const { device, collapsed } = useSelector((state: AppState) => state.globalReducer)
  const isMobile = device === 'MOBILE'
  const dispatch = useDispatch()

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

  return (
    <Layout className="layout-page">
      {!isMobile ? (
        <Sider className="layout-page-sider" trigger={null} collapsible collapsed={collapsed} breakpoint="md">
          <div className="logo">
            <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
            <img src={AntdSvg} alt="" />
          </div>
          <MenuComponent menuList={menuList} />
        </Sider>
      ) : (
        <Drawer
          width="200"
          placement="left"
          bodyStyle={{ padding: 0, backgroundColor: '#141414', height: '100%' }}
          closable={false}
          onClose={toggle}
          visible={!collapsed}
        >
          <MenuComponent menuList={menuList} />
        </Drawer>
      )}
      <Layout>
        <HeaderComponent collapsed={collapsed} toggle={toggle} />
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={<SuspendFallbackLoading />}>
            <MainRoutes />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
