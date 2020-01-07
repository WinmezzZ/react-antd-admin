import { GlobalState, GlobalActions } from '~/actions/global.action'
import { getGlobalState } from '~/uitls/getGloabal'

const globalState: GlobalState = {
  ...getGlobalState()
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
