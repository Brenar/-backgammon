import { connect } from 'react-redux'

import './style.scss'

import {
  whiteDeskSelector,
  blackDeskSelector,
  blackScoreSelector,
  whiteScoreSelector,
  pointsSelector,
  turnSelector,
  initStartGame,
  handleChangeTurn,
  handleRollTheDices,
  handleMoveChecker,
} from '../../models/backgammon'

const deskSeparator = (desk) => {
  const firstDesk = [],
    secondDesk = []
  for (let i = 0; i < desk.length; i++) {
    if (i < 12) {
      firstDesk.push(desk[i])
    } else {
      secondDesk.push(desk[i])
    }
  }
  return [firstDesk, secondDesk]
}

export function Desk(props) {
  const { whiteDesk, blackDesk, blackScore, whiteScore, points, turn } = props
  return (
    <div className="Desk">
      {deskSeparator(whiteDesk).map((aside) => {
        return (
          <div className="deskAsideWhite" >
            {aside.map((line, key) => {
              const separator = key === 6 ? <div className="deskSep"/> : null
              return (
                <>
                {separator}
                <div className="deskLine">
                    {line.map((checker) => {
                    return <div className="deskChecker">{checker}</div>
                  })}
                </div>
                </>
              )
            })}
          </div>
        )
      })}
      {deskSeparator(blackDesk).map((aside) => {
        return (
          <div className="deskAsideBlack">
            {aside.map((line, key) => {
              const separator = key === 6 ? <div className="deskSep"/> : null
              return (
                <>
                {separator}
                <div className="deskLine">
                    {line.map((checker) => {
                    return <div className="deskChecker">{checker}</div>
                  })}
                </div>
                </>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default connect(
  (state) => ({
    whiteDesk: whiteDeskSelector(state),
    blackDesk: blackDeskSelector(state),
    blackScore: blackScoreSelector(state),
    whiteScore: whiteScoreSelector(state),
    points: pointsSelector(state),
    turn: turnSelector(state),
  }),
  { initStartGame, handleChangeTurn, handleRollTheDices, handleMoveChecker }
)(Desk)
