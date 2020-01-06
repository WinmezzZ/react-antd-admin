import { GlobalState, GlobalActions } from '~/actions/global.action'

const globalState: GlobalState = {
  device: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP',
  collapsed: false
}

export const globalReducer = (state = globalState, actions: GlobalActions): GlobalState => {
  switch (actions.type) {
    case 'SETGLOBALITEM':
      return {
        ...state,
        ...actions.payload
      }
    default:
      return state
  }
}
