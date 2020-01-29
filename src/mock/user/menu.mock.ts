import { MenuList } from '~/interface/layout/menu.interface'
import { mock, intercepter } from '../config'

const mockMenuList: MenuList = [
  {
    name: 'dashboard',
    label: {
      zh_CN: '控制台',
      en_US: 'Dashboard'
    },
    icon: 'dashboard',
    key: '0',
    path: '/dashboard'
  },
  {
    name: 'guide',
    label: {
      zh_CN: '引导',
      en_US: 'Guide'
    },
    icon: 'guide',
    key: '1',
    path: '/guide'
  },
  {
    name: 'permission',
    label: {
      zh_CN: '权限',
      en_US: 'Permission'
    },
    icon: 'permission',
    key: '2',
    path: '/permission',
    children: [
      {
        name: 'pagePermission',
        label: {
          zh_CN: '页面权限',
          en_US: 'Page Permission'
        },
        key: '2-0',
        path: '/permission/page'
      },
      {
        name: 'buttonPermission',
        label: {
          zh_CN: '按钮权限',
          en_US: 'Button Permission'
        },
        key: '2-1',
        path: '/permission/button'
      },
      {
        name: 'dataPermission',
        label: {
          zh_CN: '数据权限',
          en_US: 'Data Permission'
        },
        key: '2-2',
        path: '/permission/data'
      }
    ]
  },
  {
    name: 'application',
    label: {
      zh_CN: '应用',
      en_US: 'Application'
    },
    icon: 'application',
    key: '3',
    path: '/application',
    children: [
      {
        name: 'form',
        label: {
          zh_CN: '表单',
          en_US: 'Form'
        },
        key: '3-0',
        path: '/application/form'
      },
      {
        name: 'table',
        label: {
          zh_CN: '表格',
          en_US: 'Table'
        },
        key: '3-1',
        path: '/application/table'
      },
      {
        name: 'dialog',
        label: {
          zh_CN: '对话框',
          en_US: 'Dialog'
        },
        key: '3-2',
        path: '/application/dialog'
      },
      {
        name: 'complex',
        label: {
          zh_CN: '综合',
          en_US: 'Complex'
        },
        key: '3-3',
        path: '/application/complex'
      }
    ]
  },
  {
    name: 'account',
    label: {
      zh_CN: '个人设置',
      en_US: 'Account'
    },
    icon: 'account',
    key: '4',
    path: '/account'
  }
]

mock.mock('/user/menu', 'get', intercepter(mockMenuList))
