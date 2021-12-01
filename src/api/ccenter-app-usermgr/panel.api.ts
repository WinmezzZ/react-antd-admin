import { DeskTopResult } from '~/interface/ccenter-app-usermgr/panel.interface';

import { request } from '../request';

/** 桌面菜单接口 */
export const apiDesktopInit = () => request<DeskTopResult>('get', 'Desktop.Init', { api_ccenter_app: 'core' });
