import React, {useState} from 'react'
import './style.scss'
import DeskLine from '../desk-line'

/* eslint-disable */
const getMaxLineId = activeLines => {
  let maxId = 0
  activeLines.map(line => {
    if (line.lineId > maxId) {
      maxId = line.lineId
    }
  })
  return maxId
}
/* eslint-enable */

const DeskAside = ({asideData, asideKey, turn, points, desk, onChangeTurn}) => {
  const [activeChecker, setActiveChecker] = useState(null)
  const [activeLines, setActiveLines] = useState([]) // [{point: 2, lineId: 12}, {point: 3, lineId: 13}]

  return (
    <div className="deskAsideWhite">
      {asideData.map((line, key) => {

        let handleCheckChecker = () => false
        const checkedLineId = ((key + 1) * (asideKey)) + 12
        if (line[0] === 1 && turn === 'white') {
          handleCheckChecker = () => {
            setActiveChecker(checkedLineId)
            let lines = []
            if (points.length === 2) {
              if ((points[0] + checkedLineId) <= 24) {
                if (desk[points[0] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1)
                  lines.push({point: points[0], lineId: points[0] + checkedLineId})
                //     lines.push(12 - ((points[0] + checkedLineId) - 24))
              } else {

              }
              if (desk[points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1) {
                if (getMaxLineId(lines) <= 24) {
                  lines.push({point: points[1], lineId: points[1] + checkedLineId})
                } else {
                  lines.push({point: points[1], lineId: 12 - ((points[1] + checkedLineId) - 24)})
                }
              }
              if (desk[points[0] + points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1) {
                if (points[0] + points[1] + checkedLineId <= 24) {
                  lines.push({point: points[0] + points[1], lineId: points[0] + points[1] + checkedLineId})
                } else {
                  lines.push({point: points[0] + points[1], lineId: 12 - ((points[0] + points[1] + checkedLineId) - 24)})
                }
              }
              setActiveLines(lines)
            }
            if (points.length === 1) {
              if ((points[0] + checkedLineId) <= 24) {
                if (desk[points[0] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 1)
                  lines.push({point: points[0], lineId: points[0] + checkedLineId})
              }
              setActiveLines(lines)
              
            }
            console.log(points)
          }
        }
        if (line[0] === 0 && turn === 'black') {
          handleCheckChecker = () => {
            setActiveChecker(checkedLineId)
            let lines = []
            if (points.length === 2) {
              if (desk[points[0] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
                lines.push(points[0] + checkedLineId)
              }
              if (desk[points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
                lines.push(points[1] + checkedLineId)
              }
              if (desk[points[0] + points[1] + checkedLineId - 1].length === 0 || desk[points[0] + checkedLineId - 1][0] === 0) {
                lines.push(points[0] + points[1] + checkedLineId)
              }
              setActiveLines(lines)
              console.log(lines)
            }
          }
        }
        return (
          <DeskLine
            handleCheckChecker={handleCheckChecker}
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