import { NotificationListParams, NotificationListResult } from '~/interface/app-notification/notification.interface';

import { request } from '../request';

/** 节点分组列表 */
export const apiNodeGroupList = (data: NotificationListParams) =>
  request<NotificationListResult>('get', 'NodeGroup.List', { ...data, api_ccenter_app: 'notification' });
