import type { MyResponse } from '../api/request';
import type { MenuList } from '@/interface/layout/menu.interface';
import type { LoginParams } from '@/interface/user/login';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { apiLogin } from '@/api/user.api';
import { removeCookie } from '@/utils/cookie';

interface UserState {
  username: string;
  merchantId: string;
  isLogin: boolean;
  breadcrumb: string;
  login: (data: LoginParams) => MyResponse;
  logout: () => void;
  setBreadcrumb: (breadcrumb: string) => void;
  roleKeys: string[];
  menuList: MenuList;
  set: (userInfo: Partial<PickNotFn<UserState>>) => void;
}

type PickNotFn<O extends object> = {
  [K in keyof O as O[K] extends (...arg: any) => any ? never : K]: O[K];
};

const initialUserState: PickNotFn<UserState> = {
  username: '',
  isLogin: false,
  breadcrumb: '',
  roleKeys: [],
  merchantId: '',
  menuList: [],
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialUserState,
        login: async data => {
          const res = await apiLogin(data);

          if (res.status) {
            set(() => ({ isLogin: true, username: data.username }));
          }

          return res;
        },
        logout: () => {
          const { username } = get();

          removeCookie('uid');
          set(() => ({
            ...initialUserState,
            username, // 保留之前的用户名，用于登录对比是否跳转到旧页面
          }));
        },
        setBreadcrumb: (breadcrumb: string) => {
          set(() => ({ breadcrumb }));
        },
        set: userInfo => {
          set(() => ({ ...userInfo }));
        },
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);
