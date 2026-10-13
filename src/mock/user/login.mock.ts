import type { LoginResult, Role } from '@/interface/user/login';

import { intercepter, mock } from '../config';

mock.onPost('/user/login').reply(config => {
  const body: LoginResult = JSON.parse(config.data);

  return [
    200,
    intercepter<LoginResult>({
      token: '123abcdefg',
      username: body?.username,
      role: body?.username as Role,
    }),
  ];
});
