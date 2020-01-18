import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { globalReducer } from '~/reducers/gloabal.reducer'
import { tagsViewlReducer } from '~/reducers/tagsView.reducer'

const rootReducer = combineReducers({
  globalReducer,
  tagsViewlReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
  const middlewares = [thunkMiddleware]

  const composeEnhancers = composeWithDevTools({})
  const middleWareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, composeEnhancers(middleWareEnhancer))

  return store
}
