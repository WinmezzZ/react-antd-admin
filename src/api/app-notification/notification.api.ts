import {
  NotificationListParams,
  NotificationListResult,
  NotificationSetReadParams,
} from '~/interface/app-notification/notification.interface';

import { request } from '../request';

/** 通知列表 */
export const apiNotificationList = (data: NotificationListParams) =>
  request<NotificationListResult>('get', 'Notification.List', { ...data, api_ccenter_app: 'notification' });

/** 通知设为已读 */
export const apiNotificationSetRead = (data: NotificationSetReadParams) =>
  request('get', 'Notification.SetRead', { ...data, api_ccenter_app: 'notification' });
