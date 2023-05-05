import type { GetUserInfoResult } from '@/api/user.api';
import type { LoginResult } from '@/interface/user/login';

import { RoleEnum } from '@/constants/userList';

import { intercepter, mock } from '../config';

mock.mock('/user/getUserInfo', 'get', (config: any) => {
  const header = JSON.parse(config?.header);

  console.log(header);

  return intercepter<GetUserInfoResult>({});
});
