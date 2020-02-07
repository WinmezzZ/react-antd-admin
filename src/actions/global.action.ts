import { Action } from 'redux'
import { Device } from '~/interface/layout/index.interface'

export interface GlobalState {
  /** user's device */
  device: Device

  /** menu collapsed status */
  collapsed: boolean

  /** notification count */
  noticeCount: number

  /** user's language */
  locale: 'zh_CN' | 'en_US'

  /** Is first time to view the site ? */
  newUser: boolean
}

const SETGLOBALITEM = 'SETGLOBALITEM'

type SETGLOBALITEM = typeof SETGLOBALITEM

interface SetGloabalItem extends Action<SETGLOBALITEM> {
  payload: Partial<GlobalState>
}

export const setGlobalItem = (payload: Partial<GlobalState>): SetGloabalItem => ({
  type: 'SETGLOBALITEM',
  payload
})

export type GlobalActions = SetGloabalItem
