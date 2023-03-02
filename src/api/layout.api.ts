import type { MenuList } from '../interface/layout/menu.interface';
import type { Notice } from '@/interface/layout/notice.interface';
import type { AxiosRequestConfig } from 'axios';

import { request } from './request';

/** 获取菜单列表接口 */
/** Provides the mock menu list to be shown in the navigation sidebar */
export const getMenuList = (config: AxiosRequestConfig = {}) => request<MenuList>('get', '/user/menu', {}, config);

/** 获取通知列表接口 */
/** Provides the mock notification list to be shown
 * in the notification dropdown
 */
export const getNoticeList = (config: AxiosRequestConfig = {}) => request<Notice[]>('get', '/user/notice', {}, config);
