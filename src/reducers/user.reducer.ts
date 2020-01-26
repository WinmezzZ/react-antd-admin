import { UserState, UserActions } from '~/actions/user.action'

const userState: UserState = {
  logged: localStorage.getItem('t') ? true : false,
  menuList: []
}

export const userReducer = (state = userState, actions: UserActions): UserState => {
  switch (actions.type) {
    case 'SETUSERITEM':
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
