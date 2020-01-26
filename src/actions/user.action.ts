import { Action } from 'redux'
import { MenuChild } from '~/interface/layout/menu.interface'
import { LoginParams } from '~/interface/user/login'
import { ThunkAction } from 'redux-thunk'
import { apiLogin, apiLogout } from '~/api/user.api'
import { AppState } from '~/stores'

export interface UserState {
  /** menu list for init tagsView */
  menuList: MenuChild[]

  /** login status */
  logged: boolean
}

const SETUSERITEM = 'SETUSERITEM'

type SETGLOBALITEM = typeof SETUSERITEM

interface SetUserItem extends Action<SETGLOBALITEM> {
  payload: Partial<UserState>
}

export const setUserItem = (payload: Partial<UserState>): SetUserItem => ({
  type: 'SETUSERITEM',
  payload
})

export type UserActions = SetUserItem

export const loginAsync = (payload: LoginParams): ThunkAction<Promise<boolean>, AppState, null, SetUserItem> => {
  return async dispatch => {
    const { result, status } = await apiLogin(payload)
    if (status) {
      localStorage.setItem('t', result.token)
      dispatch(
        setUserItem({
          logged: true
        })
      )
      return true
    }
    return false
  }
}

export const logoutAsync = (): ThunkAction<Promise<boolean>, AppState, null, SetUserItem> => {
  return async dispatch => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! })
    if (status) {
      localStorage.removeItem('t')
      dispatch(
        setUserItem({
          logged: false
        })
      )
      return true
    }
    return false
  }
}
