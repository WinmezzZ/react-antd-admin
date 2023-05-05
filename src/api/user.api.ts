import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';
import type { RoleEnum } from '@/constants/userList';

import { request } from './request';

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/api/user/login', data);

/** 登出接口 */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/user/logout', data);

export interface GetUserInfoResult {
  username: string;
  role: RoleEnum;
}

export const apiGetUserInfo = () => request<GetUserInfoResult>('post', '/user/getUserInfo');
