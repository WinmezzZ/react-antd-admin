import { Action } from 'redux'

/** 用户设备 */
enum DeviceList {
  /** 手机 */
  MOBILE = 'MOBILE',
  /** 电脑 */
  DESKTOP = 'DESKTOP'
}

export type Device = keyof typeof DeviceList

export interface GlobalState {
  /** 用户设备 */
  device: Device

  /** 菜单栏收起状态 */
  collapsed: boolean

  /** 通知消息数量 */
  noticeCount: number
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
