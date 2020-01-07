import { MenuList } from '../interface/layout/menu.interface'

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
  }
]

export default mockMenuList
