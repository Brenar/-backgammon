import React from 'react'
import {connect} from 'react-redux'
import './style.scss'
import classNames from 'classnames'
import {
  pointsSelector,
  onMoveChecker,
  onChangeTurn,
  turnSelector,
  deskSelector,
} from '../../models/backgammon'

const DeskLine = ({
  activeLines,
  setActiveLines,
  handleCheckChecker,
  activeChecker,
  setActiveChecker,
  checkedLineId,
  DeskKey,
  line,
  onMoveChecker,
  onChangeTurn,
  turn,
  points,
  blackDesk,
  whiteDesk
}) => {
  const isActiveLine = activeLines.map(item => item.lineId).includes(checkedLineId)
  const activePointsLine = activeLines.find(f => f.lineId === checkedLineId)
  const separator = DeskKey === 6 ? <div className="deskSep"/> : null
  const lineClasses = classNames({
    'deskLine': true,
    'line-active': isActiveLine
  })

/* eslint-disable */
  const handleMoveChecker = () => {
    const activeDesk = turn === 'black' ? blackDesk : whiteDesk
    activeDesk.map((line, key) => {
      if((key + 1) === activeChecker) {
        line.pop()
      }
      if((key + 1) === checkedLineId) {
        line.push(turn === 'black' ? 0 : 1)
      }
    })
    let empty = []
    if(turn === 'black') {
      for(let i = 0; i < activeDesk.length; i++) {
        if(activeDesk[i][0] === 1) {
          activeDesk[i] = empty
        }
      }
    }
    if(turn === 'white') {
      for(let i = 0; i < activeDesk.length; i++) {
        if(activeDesk[i][0] === 0) {
          activeDesk[i] = empty
        }
      }
    }
    console.log(activePointsLine)
    // TODO: добавить условие, при котором мы сходили на 2, или на 3, то убирать ход на 5
    setActiveLines(activeLines.filter(f => f.point !== activePointsLine.point && points[0] + points[1] !== activePointsLine.point))
    setActiveChecker(null)
    setActiveLines([])
    console.log(activePointsLine)
    onMoveChecker(activeDesk, activePointsLine.point)
  }



/* eslint-enable */
  return (
    <span>
      {separator}
      <div className={lineClasses} onClick={isActiveLine ? handleMoveChecker : handleCheckChecker}>
        {line.map((checker, checkKey) => {
          const checkerClasses = classNames({
            'deskChecker': true,
            'checker-white': checker === 1,
            'checker-black': checker === 0,
            'checker-active': (activeChecker === checkedLineId) && (checkKey === line.length - 1)
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
}

export default connect((state) => ({
  whiteDesk: deskSelector(state),
  //blackDesk: blackDeskSelector(state),
  turn: turnSelector(state),
  points: pointsSelector(state),
}), {onMoveChecker, onChangeTurn})(DeskLine)