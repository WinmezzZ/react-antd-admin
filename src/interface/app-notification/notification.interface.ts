import { NotificationLevelEnum } from '~/config/enum/notification-level.enum';

import { Pagination } from '../common/pagination.interface';

export interface NotificationListParams {
  /** 是否已读 */
  IsRead: YN;
  /** 应用代号 */
  AppCode: string;
  /** 	通知标题 */
  Title?: string;
  /** 通知等级 */
  Level?: keyof typeof NotificationLevelEnum;
  /** 创建时间 */
  CreateTime?: any;
}

export interface Notification {
  AppCode: string;
  AppName: string;
  Body: string;
  CreateTime: number;
  Id: number;
  IsRead: YN;
  Level: keyof typeof NotificationLevelEnum;
  NodeAddr: string;
  NodeId: number;
  NodeName: string;
  NotificationId: number;
  ReadTime: number;
  Title: string;
}

export type NotificationList = Notification[];

export type NotificationListResult = Pagination<'NodeGroupList', NotificationList>;
