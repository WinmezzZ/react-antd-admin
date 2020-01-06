export interface LoginParams {
  /** 用户名 */
  username: string
  /** 用户密码 */
  password: string
}

export interface LoginResult {
  /** auth token */
  token: string
}
