import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';

import { request } from './request';

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/user/login', data);

/** 登出接口 */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/user/logout', data);
