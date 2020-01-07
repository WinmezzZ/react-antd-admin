import { FC, useState, useEffect } from 'react'
import React from 'react'
import { Menu } from 'antd'
import { getMenuList } from '../../api/layout.api'
import { MenuList } from '../../interface/layout/menu.interface'
import { ClickParam } from 'antd/lib/menu'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomIcon } from './customIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalItem } from '~/actions/global.action'
import { AppState } from '~/stores'

const { SubMenu, Item } = Menu

const MenuComponent: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])
  const [openKeys, setOpenkeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { collapsed, device } = useSelector((state: AppState) => state.globalReducer)
  const dispatch = useDispatch()
  const router = useHistory()
  const { pathname } = useLocation()

  const fetchMenuList = async () => {
    const { status, result } = await getMenuList()
    if (status) {
      setMenuList(result)
    }
  }

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label}</span>
      </span>
    )
  }

  const onMenuClick = ({ key }: ClickParam) => {
    setSelectedKeys([key])
    dispatch(setGlobalItem({ collapsed: device !== 'DESKTOP' }))
    router.push(key)
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenkeys(collapsed ? [] : ['/' + pathname.split('/')[1]])
  }, [pathname, collapsed])

  useEffect(() => {
    fetchMenuList()
  }, [])

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={keys => setOpenkeys([keys.pop()!])}
      onClick={onMenuClick}
    >
      {menuList?.map(menu =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)}>
            {menu.children.map(child => (
              <Item key={child.path}>{child.label}</Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path}>{getTitie(menu)}</Item>
        )
      )}
    </Menu>
  )
}

export default MenuComponent
