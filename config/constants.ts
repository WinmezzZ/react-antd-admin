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
    id: '38a7dda2-fcbc-4e5b-92c8-7a60f503037c',
  },
  {
    username: 'testUer',
    password: '123456',
    role: RoleEnum.User,
    id: 'd2d9c266-b710-4fcb-a349-be68caa2a050',
  },
];
