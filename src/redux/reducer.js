import { reducer as formReducer } from 'redux-form'
import gameDataReducer, { moduleName as gameReducer} from '../models/currency'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { history } from '../history'

const createRootReducer = combineReducers({
  router: connectRouter(history),
  [gameReducer]: gameDataReducer,
  form: formReducer,
})

export default createRootReducer

