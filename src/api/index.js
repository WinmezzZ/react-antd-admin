import fetch from './request'

// 登录
export const login = params => fetch('/api/login', params, 'POST')
// 登录
export const register = params => fetch('/api/register', params, 'POST')
// 获取菜单
export const getMenu = params => fetch('/mock/user/menu', params, 'POST')
// 获取人员列表
export const getPersonlist = params => fetch('/api/person/list', params, 'GET')
// 添加人员
export const addPerson = params => fetch('/api/person/add', params, 'POST')
// 更新人员
export const updatePerson = params => fetch('/api/person/update', params, 'POST')
// 删除人员
export const delectPerson = params => fetch('/api/person/delete', params, 'POST')
