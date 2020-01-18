import { FC, useState, useEffect, useCallback } from 'react'
import React from 'react'
import { Menu } from 'antd'
import { getMenuList } from '../../api/layout.api'
import { MenuList, MenuChild } from '../../interface/layout/menu.interface'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomIcon } from './customIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalItem } from '~/actions/global.action'
import { AppState } from '~/stores'
import { addTag } from '~/actions/tagsView.action'

const { SubMenu, Item } = Menu

const MenuComponent: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])
  const [openKeys, setOpenkeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { collapsed, device } = useSelector((state: AppState) => state.globalReducer)
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()

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
        setGlobalItem({
          menuList: initMenuListAll(result)
        })
      )
    }
  }, [dispatch])

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label}</span>
      </span>
    )
  }

  const onMenuClick = (menu: MenuList[0]) => {
    if (menu.path === pathname) return
    const { key, label, path } = menu
    setSelectedKeys([key])
    dispatch(setGlobalItem({ collapsed: device !== 'DESKTOP' }))
    dispatch(
      addTag({
        id: key,
        label,
        path
      })
    )
    history.push(path)
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenkeys(collapsed ? [] : ['/' + pathname.split('/')[1]])
  }, [collapsed, pathname])

  useEffect(() => {
    fetchMenuList()
  }, [fetchMenuList])

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={keys => setOpenkeys([keys.pop()!])}
      className="layout-page-sider-menu"
    >
      {menuList?.map(menu =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)}>
            {menu.children.map(child => (
              <Item key={child.path} onClick={() => onMenuClick(child)}>
                {child.label}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitie(menu)}
          </Item>
        )
      )}
    </Menu>
  )
}

export default MenuComponent
