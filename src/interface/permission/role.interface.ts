export type RoleStatus = 'enabled' | 'disabled' | 'all'

export interface Role {
  name: {
    zh_CN: string
    en_US: string
  }
  code: string
  id: number
  status: RoleStatus
}

export type GetRoleResult = Role[]
