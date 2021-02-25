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
      if(checker > 0){

      }
    })
  })

  return countTurns === 0
}
