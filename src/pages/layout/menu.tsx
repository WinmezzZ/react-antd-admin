import { FC, useState, useEffect } from 'react'
import React from 'react'
import { Menu } from 'antd'
import { getMenuList } from '../../api/layout.api'
import { MenuList } from '../../interface/layout/menu.interface'

const { SubMenu, Item } = Menu

const MenuComponent: FC = () => {
  const [menuList, setMenuList] = useState<MenuList>([])

  const fetchMenuList = async () => {
    const { status, result } = await getMenuList()
    console.log(status)
    if (status) {
      setMenuList(result)
    }
  }

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span>
        <embed className="anticon" type="image/svg+xml" src={require(`~/assets/menu/${menu.icon}.svg`)} />
        <span>{menu.label}</span>
      </span>
    )
  }

  useEffect(() => {
    fetchMenuList()
  }, [])
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']}>
      {menuList.map(menu =>
        menu.children ? (
          <SubMenu key={menu.key} title={getTitie(menu)}>
            {menu.children.map(child => (
              <Item key={child.key}>{child.label}</Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.key}>{getTitie(menu)}</Item>
        )
      )}
    </Menu>
  )
}

export default MenuComponent
