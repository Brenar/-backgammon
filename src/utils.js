export const getRandomDices = () => {
  let arr = []
  arr = [Math.round(Math.random() * 5 + 1), Math.round(Math.random() * 5 + 1)]
  return arr
}
