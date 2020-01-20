import { Action } from 'redux'
import { Device } from '~/interface/layout/index.interface'
import { MenuChild } from '~/interface/layout/menu.interface'

export interface GlobalState {
  /** user's device */
  device: Device

  /** menu collapsed status */
  collapsed: boolean

  /** notification count */
  noticeCount: number

  /** menu list for init tagsView */
  menuList: MenuChild[]
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
