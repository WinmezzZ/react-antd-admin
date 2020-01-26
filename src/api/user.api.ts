import { request } from './request'
import { LoginResult, LoginParams } from '../interface/user/login'

/** 登录接口 */
export const apiLogin = (data: LoginParams) => request<LoginResult>('get', '/user/login', data)
