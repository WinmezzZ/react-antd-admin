export enum RoleEnum {
  Admin,
  User,
  Guest,
}

export const defaultUserList = [
  {
    username: 'admin',
    password: '123456',
    role: RoleEnum.Admin,
  },
  {
    username: 'testUer',
    password: '123456',
    role: RoleEnum.User,
  },
];
