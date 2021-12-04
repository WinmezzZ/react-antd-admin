import { AnnouncementListParams, AnnouncementListResult } from '~/interface/app-notification/announcement.interface';

import { request } from '../request';

/** 节点分组列表 */
export const apiAnnouncementList = (data: AnnouncementListParams) =>
  request<AnnouncementListResult>('get', 'Announcement.List', { ...data, api_ccenter_app: 'notification' });
