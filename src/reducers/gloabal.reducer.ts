import { GlobalState, GlobalActions } from '~/actions/global.action'
import { getGlobalState } from '~/uitls/getGloabal'

const globalState: GlobalState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: localStorage.getItem('locale')! || navigator.language
}

export const globalReducer = (state = globalState, actions: GlobalActions): GlobalState => {
  switch (actions.type) {
    case 'SETGLOBALITEM':
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
