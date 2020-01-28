import { MenuList } from '~/interface/layout/menu.interface'
import { mock, intercepter } from '../config'

const mockMenuList: MenuList = [
  {
    name: 'dashboard',
    label: '控制台',
    icon: 'dashboard',
    key: '0',
    path: '/dashboard',
    id: 'menu.dashboard'
  },
  {
    name: 'guide',
    label: '引导',
    icon: 'guide',
    key: '1',
    path: '/guide',
    id: 'menu.guide'
  },
  {
    name: 'permission',
    label: '权限',
    icon: 'permission',
    key: '2',
    path: '/permission',
    id: 'menu.permission',
    children: [
      {
        name: 'pagePermission',
        label: '页面权限',
        key: '2-0',
        path: '/permission/page',
        id: 'menu.permission.page'
      },
      {
        name: 'buttonPermission',
        label: '按钮权限',
        key: '2-1',
        path: '/permission/button',
        id: 'menu.permission.button'
      },
      {
        name: 'dataPermission',
        label: '数据权限',
        key: '2-2',
        path: '/permission/data',
        id: 'menu.permission.data'
      }
    ]
  },
  {
    name: 'application',
    label: '应用',
    icon: 'permission',
    key: '3',
    path: '/application',
    id: 'menu.application',
    children: [
      {
        name: 'form',
        label: '表单',
        key: '3-0',
        path: '/application/form',
        id: 'menu.application.form'
      },
      {
        name: 'table',
        label: '表格',
        key: '3-1',
        path: '/application/table',
        id: 'menu.application.table'
      },
      {
        name: 'dialog',
        label: '对话框',
        key: '3-2',
        path: '/application/dialog',
        id: 'menu.application.dialog'
      },
      {
        name: 'complex',
        label: '综合',
        key: '3-3',
        path: '/application/complex',
        id: 'menu.application.complex'
      }
    ]
  },
  {
    name: 'account',
    label: '个人设置',
    icon: 'account',
    key: '4',
    path: '/account',
    id: 'menu.account'
  }
]

mock.mock('/user/menu', 'get', intercepter(mockMenuList))
