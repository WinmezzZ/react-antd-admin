import { GlobalState, GlobalActions } from '~/actions/global.action'
import { getGlobalState } from '~/utils/getGloabal'

const globalState: GlobalState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || 'en_US') as any,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true
}

export const globalReducer = (state = globalState, actions: GlobalActions): GlobalState => {
  switch (actions.type) {
    case 'SETGLOBALITEM':
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
