import {connect} from 'react-redux'
import React, {useState} from 'react'
import './style.scss'
import classNames from 'classnames'

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
  const {whiteDesk, blackDesk, blackScore, whiteScore, points, turn} = props

  const [activeChecker, setActiveChecker] = useState(null)

  return (
    <div className="Desk">
      {deskSeparator(whiteDesk).map((aside, asideKey) => {
        return (
          <div key={asideKey} className="deskAsideWhite">
            {aside.map((line, key) => {
              const separator = key === 6 ? <div className="deskSep"/> : null
              let handleCheckChecker = () => false
              const activeLineId = ((key + 1) * (asideKey)) + 12
              if (line[0] === 0 && turn === 'black') {
                handleCheckChecker = () => setActiveChecker(activeLineId)
              }
              if (line[0] === 1 && turn === 'white') {
                handleCheckChecker = () => setActiveChecker(activeLineId)
              }
              return (
                <span key={key}>
                {separator}
                  <div className="deskLine" onClick={handleCheckChecker}>
                    {line.map((checker, checkKey) => {
                      const checkerClasses = classNames({
                        'deskChecker': true,
                        'checker-white': checker === 1,
                        'checker-black': checker === 0,
                        'checker-active': (activeChecker === activeLineId) && (checkKey === line.length - 1)
                      })

                      return <div
                        key={checkKey}
                        className={checkerClasses}
                      >
                        {checker}
                      </div>
                    })}
                </div>
                </span>
              )
            })}
          </div>
        )
      })}
      {deskSeparator(blackDesk).map((aside, asideKey) => {
        return (
          <div key={asideKey} className="deskAsideBlack">
            {aside.map((line, key) => {
              const separator = key === 6 ? <div className="deskSep"/> : null
              return (
                <span key={key}>
                {separator}
                  <div className="deskLine">
                    {line.map((checker, checkerKey) => {
                      return <div key={checkerKey} className="deskChecker">{checker}</div>
                    })}
                </div>
                </span>
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
  {initStartGame, handleChangeTurn, handleRollTheDices, handleMoveChecker}
)(Desk)
