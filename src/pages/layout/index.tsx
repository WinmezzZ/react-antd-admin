import React, { FC, useEffect, Suspense } from 'react'
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
import { getGlobalState } from '~/uitls/getGloabal'

const { Sider, Content } = Layout
const WIDTH = 992

const LayoutPage: FC = () => {
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
  })

  return (
    <Layout className="layout-page">
      {!isMobile ? (
        <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="md">
          <div className="logo">
            <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }}></img>
            <img src={AntdSvg} alt=""></img>
          </div>
          <MenuComponent />
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
          <MenuComponent />
        </Drawer>
      )}
      <Layout>
        <HeaderComponent collapsed={collapsed} toggle={toggle} />
        <Content>
          <Suspense fallback={<h1>Loading profile...</h1>}>
            <MainRoutes />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
