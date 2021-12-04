import { PageParams, Pagination } from '../common/pagination.interface';

export interface AnnouncementListParams extends PageParams {
  /** 是否已读 */
  IsRead?: YN;
  /** 创建时间 */
  PublishTime?: any;
}

export interface Announcement {
  Cate: string;
  Id: number;
  IsDevVersion: YN;
  IsRead: YN;
  PublishTime: number;
  ReadTime: number;
  Title: string;
}

export type AnnouncementList = Announcement[];

export type AnnouncementListResult = Pagination<'Announcement', AnnouncementList>;
