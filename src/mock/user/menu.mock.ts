import { MenuList } from 'interface/layout/menu.interface';
import { mock, intercepter } from '../config';

const mockMenuList: MenuList = [
  {
    name: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard'
    },
    icon: 'dashboard',
    key: '0',
    path: '/dashboard'
  },
  {
    name: 'documentation',
    label: {
      zh_CN: '文档',
      en_US: 'Documentation'
    },
    icon: 'documentation',
    key: '1',
    path: '/documentation'
  },
  {
    name: 'guide',
    label: {
      zh_CN: '引导',
      en_US: 'Guide'
    },
    icon: 'guide',
    key: '2',
    path: '/guide'
  },
  {
    name: 'permission',
    label: {
      zh_CN: '权限',
      en_US: 'Permission'
    },
    icon: 'permission',
    key: '3',
    path: '/permission',
    children: [
      {
        name: 'routePermission',
        label: {
          zh_CN: '路由权限',
          en_US: 'Route Permission'
        },
        key: '2-0',
        path: '/permission/route'
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
        name: 'permissionConfig',
        label: {
          zh_CN: '权限配置',
          en_US: 'Permission Config'
        },
        key: '2-2',
        path: '/permission/config'
      },
      {
        name: 'notFound',
        label: {
          zh_CN: '404',
          en_US: '404'
        },
        key: '2-3',
        path: '/permission/404'
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
  },

  {
    name: 'usage',
    label: {
      zh_CN: '使用',
      en_US: 'Usage'
    },
    icon: 'permission',
    key: '5',
    path: '/usage',
    children: [
      {
        name: 'usageForm',
        label: {
          zh_CN: '表单',
          en_US: 'Form'
        },
        key: '5-0',
        path: '/usage/form'
      },
      {
        name: 'usageTable',
        label: {
          zh_CN: '表格',
          en_US: 'Table'
        },
        key: '5-1',
        path: '/usage/table'
      },
      {
        name: 'usageSearch',
        label: {
          zh_CN: '查询',
          en_US: 'Search'
        },
        key: '5-2',
        path: '/usage/search'
      },
      {
        name: 'usageAside',
        label: {
          zh_CN: '侧边栏',
          en_US: 'Aside'
        },
        key: '5-3',
        path: '/usage/aside'
      },
      {
        name: 'usageTabs',
        label: {
          zh_CN: '选项卡',
          en_US: 'Tabs'
        },
        key: '5-4',
        path: '/usage/tabs'
      }
    ]
  }
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
