import { request } from './request';
import { PageData } from 'interface';
import { BuniesssUser } from 'interface/business';

export const getBusinessUserList = () => request<PageData<BuniesssUser>>('get', '/business/list');
