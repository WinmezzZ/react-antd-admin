import { request } from './request'
import { MenuList } from '../interface/layout/menu.interface'
import { Notice } from '~/interface/layout/notice.interface'

/** 获取菜单列表接口 */
export const getMenuList = () => request<MenuList>('get', '/user/menu')

/** 获取通知列表接口 */
export const getNoticeList = () => request<Notice<'all'>[]>('get', '/user/notice')
