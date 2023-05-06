import type { MenuList } from '../interface/layout/menu.interface';
import type { Notice } from '@/interface/layout/notice.interface';

import { request } from './request';

/** 获取菜单列表接口 */
/** Provides the mock menu list to be shown in the navigation sidebar */
export const getMenuList = () => request<MenuList>('get', '/api/user/menu');

/** 获取通知列表接口 */
/** Provides the mock notification list to be shown
 * in the notification dropdown
 */
export const getNoticeList = () => request<Notice[]>('get', '/user/notice');
