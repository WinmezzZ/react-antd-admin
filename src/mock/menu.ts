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
        name: 'pagePermisson',
        label: '页面权限',
        key: '2-0',
        path: '/permisson/page'
      },
      {
        name: 'buttonPermisson',
        label: '按钮权限',
        key: '2-1',
        path: '/permisson/button'
      },
      {
        name: 'dataPermisson',
        label: '数据权限',
        key: '2-2',
        path: '/permisson/data'
      }
    ]
  }
]

export default mockMenuList
