import React, {useState} from 'react'
import './style.scss'
import DeskLine from '../desk-line'

const handleCheckCheckerCarry = (line, setActiveChecker, checkedLineId, points, desk, setActiveLines, turn) => {
  if (line[0] === 1 && turn === 'white') {
    setActiveChecker(checkedLineId)
    let lines = []
    if (points.length === 2) {
      if ((points[0] + checkedLineId) <= 24) {
        if (desk[points[0] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1)
          lines.push({point: points[0], lineId: points[0] + checkedLineId})
      } else {

      }
      if (desk[points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1) {
        if (getMaxLineId(lines) <= 24) {
          lines.push({point: points[1], lineId: points[1] + checkedLineId})
        } else {
          lines.push({point: points[1], lineId: 12 - ((points[1] + checkedLineId) - 24)})
        }
      }
      if (desk[points[0] + points[1] + checkedLineId - 1].length === 0 && lines.length !== 0 || desk[points[0] + checkedLineId - 1][0] === 1) {
        if (points[0] + points[1] + checkedLineId <= 24) {
          lines.push({point: points[0] + points[1], lineId: points[0] + points[1] + checkedLineId})
        } else {
          lines.push({point: points[0] + points[1], lineId: 12 - ((points[0] + points[1] + checkedLineId) - 24)})
        }
      }
      setActiveLines(lines)
    }
  } else if(line[0] === 0 && turn === 'black') {
    setActiveChecker(checkedLineId)
    let lines = []
    if (points.length === 2) {
      if (desk[points[0] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
        lines.push(points[0] + checkedLineId)
      }
      if (desk[points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
        lines.push(points[1] + checkedLineId)
      }
      if (desk[points[0] + points[1] + checkedLineId - 1].length === 0 && lines.length !== 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
        lines.push(points[0] + points[1] + checkedLineId)
      }
      setActiveLines(lines)
      console.log(lines)
    }
  }
}

const getMaxLineId = activeLines => {
  let maxId = 0
  activeLines.map(line => {
    if (line.lineId > maxId) {
      maxId = line.lineId
    }
  })
  return maxId
}

const DeskAside = ({asideData, asideKey, turn, points, desk}) => {
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
          />
        )
      })}
    </div>
  )
}

export default DeskAside