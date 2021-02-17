import React from 'react'
import {connect} from 'react-redux'
import './style.scss'
import classNames from 'classnames'
import {
  blackDeskSelector,
  onMoveChecker,
  turnSelector,
  whiteDeskSelector,
} from '../../models/backgammon'

const DeskLine = ({
                    activeLines,
                    handleCheckChecker,
                    activeChecker,
                    activeLineId,
                    DeskKey,
                    line,
                    onMoveChecker,
                    turn,
                    blackDesk,
                    whiteDesk
}) => {
  const isActiveLine = activeLines.includes(activeLineId)
  const separator = DeskKey === 6 ? <div className="deskSep"/> : null
  const lineClasses = classNames({
    'deskLine': true,
    'line-active': isActiveLine
  })

  const handleMoveChecker = () => {
    const activeDesk = turn === 'black' ? blackDesk : whiteDesk
    activeDesk.map((line, key) => {
      if((key + 1) === activeChecker) {
        line.pop()
      }
      if((key + 1) === activeLineId) {
        line.push(turn === 'black' ? 0 : 1)
      }
    })
    console.log(activeDesk)
    onMoveChecker(activeDesk)
  }

  return (
    <span>
      {separator}
      <div className={lineClasses} onClick={isActiveLine ? handleMoveChecker : handleCheckChecker}>
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
}

export default connect((state) => ({
  whiteDesk: whiteDeskSelector(state),
  blackDesk: blackDeskSelector(state),
  turn: turnSelector(state),
}), {onMoveChecker})(DeskLine)