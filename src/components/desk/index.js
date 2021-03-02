import {connect} from 'react-redux'
import React from 'react'
import './style.scss'
import DeskAside from '../desk-aside'

import {
  deskSelector,
  blackScoreSelector,
  whiteScoreSelector,
  pointsSelector,
  turnSelector,
  initStartGame,
  onChangeTurn,
  onRollTheDices,
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
  return (
    <div className="Desk">
      {deskSeparator(whiteDesk).map((aside, asideKey) => {
        return (
          <DeskAside
            asideData={aside}
            asideKey={asideKey}
            key={asideKey}
            turn={turn}
            points={points}
            desk={whiteDesk}
          />
        )
      })}
    </div>
  )
}

export default connect(
  (state) => ({
    whiteDesk: deskSelector(state),
    //blackDesk: blackDeskSelector(state),
    blackScore: blackScoreSelector(state),
    whiteScore: whiteScoreSelector(state),
    points: pointsSelector(state),
    turn: turnSelector(state),
  }),
  {initStartGame, onChangeTurn, onRollTheDices}
)(Desk)
