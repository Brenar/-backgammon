import {MOVE_CHECKER_REQUEST, CHANGE_TURN_REQUEST, moduleName} from '../models/backgammon'
import {isImpossibleTurn} from '../utils'

export const changeTurnMiddleware = storeApi => next => action => {
  if(action.type === MOVE_CHECKER_REQUEST) {
    if(isImpossibleTurn(storeApi.getState()[moduleName])) {
      storeApi.dispatch({
        type: CHANGE_TURN_REQUEST
      })
    }
  }
  return next()
}