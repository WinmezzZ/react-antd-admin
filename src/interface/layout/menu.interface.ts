interface MenuItem {
  /** 菜单中文名 */
  name: string
  /** 菜单英文名 */
  label: string
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: string
  /** 菜单id */
  key: string
  /** 菜单路由 */
  path: string
  /** 子菜单 */
  children?: MenuItem[]
  id: string
}

export type MenuChild = Omit<MenuItem, 'children'>

export type MenuList = MenuItem[]
