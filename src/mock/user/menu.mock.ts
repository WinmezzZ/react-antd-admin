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
    name: 'component',
    label: {
      zh_CN: '组件',
      en_US: 'Component'
    },
    icon: 'permission',
    key: '5',
    path: '/component',
    children: [
      {
        name: 'componentForm',
        label: {
          zh_CN: '表单',
          en_US: 'Form'
        },
        key: '5-0',
        path: '/component/form'
      },
      {
        name: 'componentTable',
        label: {
          zh_CN: '表格',
          en_US: 'Table'
        },
        key: '5-1',
        path: '/component/table'
      },
      {
        name: 'componentSearch',
        label: {
          zh_CN: '查询',
          en_US: 'Search'
        },
        key: '5-2',
        path: '/component/search'
      },
      {
        name: 'componentAside',
        label: {
          zh_CN: '侧边栏',
          en_US: 'Aside'
        },
        key: '5-3',
        path: '/component/aside'
      },
      {
        name: 'componentTabs',
        label: {
          zh_CN: '选项卡',
          en_US: 'Tabs'
        },
        key: '5-4',
        path: '/component/tabs'
      },
      {
        name: 'componentRadioCards',
        label: {
          zh_CN: '单选卡片',
          en_US: 'Radio Cards'
        },
        key: '5-5',
        path: '/component/radio-cards'
      }
    ]
  },

  {
    name: 'business',
    label: {
      zh_CN: '业务',
      en_US: 'Business'
    },
    icon: 'permission',
    key: '6',
    path: '/business',
    children: [
      {
        name: 'basic',
        label: {
          zh_CN: '基本',
          en_US: 'Basic'
        },
        key: '6-0',
        path: '/business/basic'
      },
      {
        name: 'withSearch',
        label: {
          zh_CN: '带查询',
          en_US: 'WithSearch'
        },
        key: '6-1',
        path: '/business/with-search'
      },
      {
        name: 'withAside',
        label: {
          zh_CN: '带侧边栏',
          en_US: 'WithAside'
        },
        key: '6-2',
        path: '/business/with-aside'
      },
      {
        name: 'withNavTabs',
        label: {
          zh_CN: '带导航条',
          en_US: 'With Nav Tabs'
        },
        key: '6-3',
        path: '/business/with-nav-tabs'
      },
      {
        name: 'withCommonAside',
        label: {
          zh_CN: '带公共侧边栏',
          en_US: 'With Common Aside'
        },
        key: '6-4',
        path: '/business//with-common-aside'
      },
      {
        name: 'businessTabs',
        label: {
          zh_CN: '选项卡',
          en_US: 'Tabs'
        },
        key: '6-4',
        path: '/business/tabs'
      },
      {
        name: 'businessRadioCards',
        label: {
          zh_CN: '单选卡片',
          en_US: 'Radio Cards'
        },
        key: '6-5',
        path: '/business/radio-cards'
      }
    ]
  }
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
