import { createSelector } from 'reselect'
import { getRandomDices } from '../utils'

/**
 * Constants
 * */

export const moduleName = 'gameModel'

export const GAME_START = `${moduleName}/GAME_START`
export const ROLL_THE_DICES = `${moduleName}/ROLL_THE_DICES`

export const MOVE_CHECKER_REQUEST = `${moduleName}/MOVE_CHECKER_REQUEST`
export const MOVE_CHECKER_SUCCESS = `${moduleName}/MOVE_CHECKER_SUCCESS`
export const CHANGE_TURN_REQUEST = `${moduleName}/CHANGE_TURN_REQUEST`
export const CHANGE_TURN_SUCCESS = `${moduleName}/CHANGE_TURN_SUCCESS`
export const GAME_OVER_SUCCESS = `${moduleName}/GAME_OVER_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = {
  deskForBlack: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
  deskForWhite: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
  points: [0, 0],
  turn: 'black', // or white
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case GAME_START:
      return Object.assign({}, ReducerRecord)
    case ROLL_THE_DICES:
      return Object.assign(
        {},
        {
          points: payload,
        }
      )
    case MOVE_CHECKER_SUCCESS:
      const deskData =
        state.turn === 'black'
          ? { deskForBlack: payload }
          : { deskForWhite: payload }
      return Object.assign({}, deskData)
    case CHANGE_TURN_SUCCESS:
      const currentTurn = state.turn === 'black' ? 'white' : 'black'
      return Object.assign(
        {},
        {
          turn: currentTurn,
        }
      )
    case GAME_OVER_SUCCESS:
      return Object.assign({}, ReducerRecord)
    default:
      return state
  }
}

/**
 * Selectors
 * */

//TODO: create selectors

export const stateSelector = (state) => state[moduleName]
export const whiteDeskSelector = createSelector(
  stateSelector,
  (state) => state.deskForBlack
)
export const blackDeskSelector = createSelector(
  stateSelector,
  (state) => state.deskForWhite
)
export const turnSelector = createSelector(stateSelector, (state) => state.turn)
export const pointsSelector = createSelector(
  stateSelector,
  (state) => state.points
)

/**
 * Action Creators
 * */

export const initStartGame = () => ({
  type: GAME_START,
})

export const handleRollTheDices = () => ({
  type: ROLL_THE_DICES,
  payload: getRandomDices(),
})

export const handleMoveChecker = (desk) => ({
  type: MOVE_CHECKER_REQUEST,
  payload: desk,
})

export const handleChangeTurn = () => ({
  type: CHANGE_TURN_REQUEST,
})
