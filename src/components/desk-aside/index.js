import React, {useState} from 'react'
import './style.scss'
import DeskLine from '../desk-line'

const DeskAside = ({asideData, asideKey, turn, points, desk}) => {
  const [activeChecker, setActiveChecker] = useState(null)
  const [activeLines, setActiveLines] = useState([])

  return (
    <div className="deskAsideWhite">
      {asideData.map((line, key) => {

        let handleCheckChecker = () => false
        const activeLineId = ((key + 1) * (asideKey)) + 12
        if (line[0] === 1 && turn === 'white') {
          handleCheckChecker = () => {
            setActiveChecker(activeLineId)
            let lines = []
            if (points.length === 2) {
              if (desk[points[0] + activeLineId - 1].length == 0) {
                lines.push(points[0] + activeLineId)
              }
              if (desk[points[1] + activeLineId - 1].length == 0) {
                lines.push(points[1] + activeLineId)
              }
              if (desk[points[0] + points[1] + activeLineId - 1].length == 0 && lines.length !== 0) {
                lines.push(points[0] + points[1] + activeLineId)

              }
              setActiveLines(lines)
              console.log(activeLines.includes((((key + 1) * (asideKey)) + 12)))
            }
          }
        }
        if (line[0] === 0 && turn === 'black') {
          handleCheckChecker = () => setActiveChecker(activeLineId)
        }

        return (
          <DeskLine
            handleCheckChecker={handleCheckChecker}
            activeChecker={activeChecker}
            key={key}
            DeskKey={key}
            line={line}
            activeLineId={activeLineId}
            activeLines={activeLines}
          />
        )
      })}
    </div>
  )
}

export default DeskAside