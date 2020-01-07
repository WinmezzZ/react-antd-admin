import { FC, useState, useEffect } from 'react'
import React from 'react'
import { Menu } from 'antd'
import { getMenuList } from '../../api/layout.api'
import { MenuList } from '../../interface/layout/menu.interface'
import { CustomIcon } from './customIcon'
import { ClickParam } from 'antd/lib/menu'
import { useHistory, useLocation } from 'react-router-dom'

const { SubMenu, Item } = Menu

const MenuComponent: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])
  const router = useHistory()
  const location = useLocation()

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

  const onMenuClick = ({ keyPath }: ClickParam) => {
    router.push(keyPath[0])
  }

  useEffect(() => {
    console.log(location, router)
  }, [location, router])

  useEffect(() => {
    fetchMenuList()
  }, [])

  return (
    <Menu mode="inline" selectedKeys={[location.pathname]} onClick={onMenuClick}>
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
