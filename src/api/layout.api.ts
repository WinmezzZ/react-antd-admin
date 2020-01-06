import { request } from './request'
import { MenuList } from '../interface/layout/menu.interface'

/** 获取菜单列表接口 */
export const getMenuList = () => request<MenuList>('get', '/user/menu')
