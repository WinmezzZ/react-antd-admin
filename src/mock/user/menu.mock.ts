import { MenuList } from '~/interface/layout/menu.interface'
import { mock, intercepter } from '../config'

const mockMenuList: MenuList = [
  {
    name: 'dashboard',
    label: '控制台',
    icon: 'dashboard',
    key: '0',
    path: '/dashboard'
  },
  {
    name: 'guide',
    label: '引导',
    icon: 'guide',
    key: '1',
    path: '/guide'
  },
  {
    name: 'permission',
    label: '权限',
    icon: 'permission',
    key: '2',
    path: '/permission',
    children: [
      {
        name: 'pagePermission',
        label: '页面权限',
        key: '2-0',
        path: '/permission/page'
      },
      {
        name: 'buttonPermission',
        label: '按钮权限',
        key: '2-1',
        path: '/permission/button'
      },
      {
        name: 'dataPermission',
        label: '数据权限',
        key: '2-2',
        path: '/permission/data'
      }
    ]
  },
  {
    name: 'application',
    label: '应用',
    icon: 'permission',
    key: '3',
    path: '/application',
    children: [
      {
        name: 'form',
        label: '表单',
        key: '3-0',
        path: '/application/form'
      },
      {
        name: 'table',
        label: '表格',
        key: '3-1',
        path: '/application/table'
      },
      {
        name: 'dialog',
        label: '对话框',
        key: '3-2',
        path: '/application/dialog'
      },
      {
        name: 'complex',
        label: '综合',
        key: '3-3',
        path: '/application/complex'
      }
    ]
  }
]

mock.mock('/user/menu', 'get', intercepter(mockMenuList))
