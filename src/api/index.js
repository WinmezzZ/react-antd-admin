import fetch from './request'

// 登录
export const login = params => fetch('/login', params, 'POST')
// 登录
export const register = params => fetch('/register', params, 'POST')
// 获取菜单
export const getMenu = params => fetch('/mock/user/menu', params, 'POST')
