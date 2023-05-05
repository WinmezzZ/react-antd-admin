import { defineMock } from 'vite-plugin-mock-dev-server';

import { RoleEnum } from '../config/constants';

const getMenuListByRole = (role: RoleEnum) => {
  const mockMenuList = [
    {
      code: 'dashboard',
      label: {
        zh_CN: '首页',
        en_US: 'Dashboard',
      },
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      code: 'documentation',
      label: {
        zh_CN: '文档',
        en_US: 'Documentation',
      },
      icon: 'documentation',
      path: '/documentation',
    },
    {
      code: 'guide',
      label: {
        zh_CN: '引导',
        en_US: 'Guide',
      },
      icon: 'guide',
      path: '/guide',
    },
    {
      code: 'permission',
      label: {
        zh_CN: '权限',
        en_US: 'Permission',
      },
      icon: 'permission',
      path: '/permission',
      children: [
        {
          code: 'routePermission',
          label: {
            zh_CN: '路由权限',
            en_US: 'Route Permission',
          },
          path: '/permission/route',
        },
        role !== RoleEnum.Guest && {
          code: 'permissionLogin',
          label: {
            zh_CN: '登录用户页面',
            en_US: 'Page Permission',
          },
          path: '/permission/login',
        },
        role === RoleEnum.Admin && {
          code: 'permissionAdmin',
          label: {
            zh_CN: '管理员页面',
            en_US: 'Page Permission',
          },
          path: '/permission/admin',
        },
        {
          code: 'notFound',
          label: {
            zh_CN: '404',
            en_US: '404',
          },
          path: '/permission/404',
        },
      ].filter(Boolean),
    },
  ];

  return mockMenuList;
};

export default defineMock([
  {
    url: '/api/user/menu',
    method: 'GET',
    delay: 10,
    body({ getCookie }) {
      const uid = getCookie('uid');
      const role = (uid ? uid.split('-')[0] : RoleEnum.Guest) as RoleEnum;

      return {
        code: 200,
        result: getMenuListByRole(role),
      };
    },
  },
]);
