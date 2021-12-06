import { request } from '../request';
import { GetRoleResult } from '@/interface/permission/role.interface';

/** get role list api */
export const apiGetRoleList = () => request<GetRoleResult>('get', '/permission/role');
