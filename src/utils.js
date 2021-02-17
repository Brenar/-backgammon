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
