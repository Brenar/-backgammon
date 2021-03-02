import React, {useState} from 'react'
import './style.scss'
import DeskLine from '../desk-line'
import {handleCheckCheckerCarry} from '../../utils'

/* eslint-disable */


/* eslint-enable */

const DeskAside = ({asideData, asideKey, turn, points, desk, onChangeTurn}) => {
  const [activeChecker, setActiveChecker] = useState(null)
  const [activeLines, setActiveLines] = useState([])

  return (
    <div className="deskAsideWhite">
      {asideData.map((line, key) => {
        const checkedLineId = ((key + 1) * (asideKey)) + 12
        return (
          <DeskLine
            handleCheckChecker={() => handleCheckCheckerCarry(line, setActiveChecker, checkedLineId, points, desk, setActiveLines, turn)}
            activeChecker={activeChecker}
            key={key}
            DeskKey={key}
            line={line}
            checkedLineId={checkedLineId}
            activeLines={activeLines}
            setActiveLines={setActiveLines}
            setActiveChecker={setActiveChecker}
          />
        )
      })}
    </div>
  )
}

export default DeskAside