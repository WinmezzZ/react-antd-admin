import { request } from './request';
import type { PageData } from '@/interface';
import type { BuniesssUser } from '@/interface/business';

export const getBusinessUserList = (params: any) => request<PageData<BuniesssUser>>('get', '/business/list', params);
