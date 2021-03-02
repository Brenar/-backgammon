

export const getRandomDices = () => {
  let arr = []
  let copyArr = []
  arr = [Math.round(Math.random() * 5 + 1), Math.round(Math.random() * 5 + 1)]
  if (arr[0] === arr[1]) {
    copyArr = arr[0]
    arr.push(copyArr)
    arr.push(copyArr)
  }
  return arr
}

export const isImpossibleTurn = ({deskForWhite, deskForBlack, turn, points}) => {
  // TODO fixes
  let countTurns = 0
  const desk = turn === 'white' ? deskForWhite : deskForBlack

  desk && desk.map((line, lineId) => {
    line && line.map((checker, checkerId) => {
      // if(checker > 0){

      // }
      if(turn === 'white') {
        if(line[0] === 1 && points.length === 2) {
          if(desk[lineId + points[0]][0] !== 0 || (desk[lineId + points[1]][0] !== 0)) {
            countTurns++
          }
        }
        if(line[0] === 1 && points.length === 1) {
          if(desk[lineId + points[0]][0] !== 0) {
            countTurns++
          }
        }
      }
    })
  })

  return countTurns === 0
}


export const handleCheckCheckerCarry = (line, setActiveChecker, checkedLineId, points, viewDesk, setActiveLines, turn) => {
  const desk = getImageArray(viewDesk)
  setActiveChecker(checkedLineId)
  let lines = []
  if (line[0] === 1 && turn === 'white') {
    if (points.length === 2) {
      checkForTwoPoints(points, checkedLineId, getImageArray(desk), lines)
      setActiveLines(lines)
    }
    if (points.length === 1) {
      checkForOnePoint(points, checkedLineId, getImageArray(desk), lines)
      setActiveLines(lines)
    }
  } else if(line[0] === 0 && turn === 'black') {
    if (points.length === 2) {
      checkForTwoPoints(points, checkedLineId, getImageArray(desk), lines)
      setActiveLines(lines)
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

const checkForTwoPoints = (points, checkedLineId, desk, lines) => {
  if ((points[0] + checkedLineId) <= 24) {
    if (desk[getImageCheck(points[0] + checkedLineId - 1)].length === 0 || desk[getImageCheck(points[0] + checkedLineId - 1)][0] === 1)
      lines.push({point: points[0], lineId: points[0] + checkedLineId})
  } 
  if (desk[getImageCheck(points[1] + checkedLineId - 1)].length === 0 || desk[getImageCheck(points[0] + checkedLineId - 1)][0] === 1) {
    if (getMaxLineId(lines) <= 24) {
      lines.push({point: points[1], lineId: points[1] + checkedLineId})
    } else {
      lines.push({point: points[1], lineId: 12 - ((points[1] + checkedLineId) - 24)})
    }
  }
  if (desk[getImageCheck(points[0] + points[1] + checkedLineId - 1)].length === 0 && lines.length !== 0 || desk[getImageCheck(points[0] + checkedLineId - 1)][0] === 1) {
    if (points[0] + points[1] + checkedLineId <= 24) {
      lines.push({point: points[0] + points[1], lineId: points[0] + points[1] + checkedLineId})
    } else {
      lines.push({point: points[0] + points[1], lineId: 12 - ((points[0] + points[1] + checkedLineId) - 24)})
    }
  }
}

const checkForOnePoint = (points, checkedLineId, desk, lines) => {

  if ((points[0] + checkedLineId) <= 24) {
    if (desk[getImageCheck(points[0] + checkedLineId - 1)].length === 0 || desk[getImageCheck(points[0] + checkedLineId - 1)][0] === 1)
      lines.push({point: points[0], lineId: points[0] + checkedLineId})
  }
}


export const getImageArray = array => array.slice(12).concat(array.slice(0, 12).reverse())
export const getImageCheck = checkId => checkId > 23 ? checkId - 12 : checkId