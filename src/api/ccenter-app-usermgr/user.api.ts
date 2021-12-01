import { LoginParams, LoginResult } from '~/interface/ccenter-app-usermgr/user.interface';

import { request } from '../request';

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', 'User.Login', data);
