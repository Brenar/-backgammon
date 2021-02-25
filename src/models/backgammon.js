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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [],
    [1],
    [1],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
  points: [3, 2],
  turn: 'white', // or white
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case GAME_START:
      return Object.assign({}, ReducerRecord)
    case ROLL_THE_DICES:
      return Object.assign(
        {},
        state,
        {
          points: payload,
        }
      )
    case MOVE_CHECKER_REQUEST:
      const deskData = state.turn === 'black' ? { deskForBlack: payload[0] } : { deskForWhite: payload[0] }
      console.log(deskData)
      return Object.assign(
        {},
        state,
        deskData,
        {points : state.points.filter(f => payload[1] !== f && payload[1] !== state.points[0] + state.points[1])
        })
    case CHANGE_TURN_REQUEST:
      const currentTurn = state.turn === 'black' ? 'white' : 'black'
      return Object.assign(
        {},
        state,
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
  (state) => {
    const result = []
    const whiteDesk = state.deskForWhite
    const blackDesk = state.deskForBlack
/* eslint-disable */
    whiteDesk.map((whiteLine, whiteKey) => {
      let blackTemp = []
      blackDesk.map((blackLine, blackKey) => {       
        if (whiteKey === blackKey) {
          blackTemp = blackLine
        }
      })
      result.push(whiteLine.concat(blackTemp))
    })
    return result
  } 
)

export const blackDeskSelector = createSelector(
  stateSelector,
  (state) => {
    const result = []
    const whiteDesk = state.deskForWhite
    const blackDesk = state.deskForBlack

    blackDesk.map((blackLine, blackKey) => {
      let whiteTemp = []
      whiteDesk.map((whiteLine, whiteKey) => {       
        if (blackKey === whiteKey) {
          whiteTemp = whiteLine
        }
      })
      result.push(blackLine.concat(whiteTemp))
    })
    return result
  } 
)
export const blackScoreSelector = createSelector(stateSelector, (state) => {
  let count = 0
  state.deskForBlack.map((line) => {
    line.map((point) => {
      count = count + point
    })
  })
  return count
})

export const whiteScoreSelector = createSelector(stateSelector, (state) => {
  let count = 0
  state.deskForWhite.map((line) => {
    line.map((point) => {
      count = count + point
    })
  })
  return count
})
/* eslint-enable */
export const turnSelector = createSelector(stateSelector, (state) => state.turn)
export const pointsSelector = createSelector(
  stateSelector,
  (state) => state.points
)

/**
 * Action Creators
 * */

export const initStartGame = () => (dispatch, getState) => ({
  type: GAME_START,
})

export const onRollTheDices = () => ({
  type: ROLL_THE_DICES,
  payload: getRandomDices(),
})

export const onMoveChecker = (desk, points) => (dispatch, getState) => {
  dispatch({
    type: MOVE_CHECKER_REQUEST,
    payload: [desk, points],
  })
}


export const onChangeTurn = () => ({
  type: CHANGE_TURN_REQUEST,
})
