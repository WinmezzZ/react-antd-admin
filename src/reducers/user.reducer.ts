import { UserState, UserActions } from '~/actions/user.action'
import { Role } from '~/interface/user/login'

const userState: UserState = {
  logged: localStorage.getItem('t') ? true : false,
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role
}

export const userReducer = (state = userState, actions: UserActions): UserState => {
  switch (actions.type) {
    case 'SETUSERITEM':
      const { username } = actions.payload
      if (username !== state.username) {
        localStorage.setItem('username', actions.payload.username || '')
      }
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
