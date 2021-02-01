import { reducer as formReducer } from 'redux-form'
import gameDataReducer, { moduleName as gameModelReducer} from '../models/backgammon'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'

const createRootReducer = combineReducers({
  router: connectRouter(history),
  [gameModelReducer]: gameDataReducer,
  form: formReducer,
})

export default createRootReducer

