import fetch from './request'

// 登录
export const login = params => fetch('/api/login', params, 'POST')
// 登录
export const register = params => fetch('/api/register', params, 'POST')
// 获取菜单
export const getMenu = params => fetch('/mock/user/menu', params, 'POST')
