import type { PageData } from '@/interface';
import type { BuniesssUser } from '@/interface/business';

import { request } from './request';

export const getBusinessUserList = (params: any) => request<PageData<BuniesssUser>>('get', '/business/list', params);
