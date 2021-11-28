import { request } from '../request';

/** 登录接口 */
export const apiLogin = (data: any) => request('post', 'User.Login', data);
