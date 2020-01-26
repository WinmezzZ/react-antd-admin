import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { globalReducer } from '~/reducers/gloabal.reducer'
import { tagsViewlReducer } from '~/reducers/tagsView.reducer'
import { userReducer } from '~/reducers/user.reducer'

const rootReducer = combineReducers({
  globalReducer,
  userReducer,
  tagsViewlReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  return store
}
