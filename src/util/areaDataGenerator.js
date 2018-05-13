import getSiblingOfPoint from './getSiblingofPoint'
import mapMultiArray from './mapMultiArray'

function mineDangerCounter(minePosition, area) {
  const minePositionSiblingsId = []

  minePosition.forEach(value => {
    let row = Number(value.split(" ")[0])
    let col = Number(value.split(" ")[1])

    minePositionSiblingsId.push(getSiblingOfPoint({row, col}, area).map(item => item.id))
  })

  return minePositionSiblingsId.reduce((newArea, pointsIdArray) => {
    return mapMultiArray(newArea,
      (item) => {
        if(!pointsIdArray.includes(item.id)) return item
        return Object.assign({...item}, {value: ++item.value})
      })
  }, area)
}

function areaDataGenerator(setting) {
  const {row, col, mine} = setting
  const area = []
  let minePosition = new Set()

  while(minePosition.size < mine) {
    minePosition.add( `${Math.floor(Math.random() * row)} ${Math.floor(Math.random() * col)}` )
  }

  for(let i=0;  i < row; i++) {
    area[i] = [];
    for (let j = 0; j < col; j++){
      area[i][j] = {
        id: `r${i}c${j}`,
        row: i,
        col: j,
        mine: minePosition.has(`${i} ${j}`),
        value: 0,
        open: false,
        checked: false,
      };
    }
  }

  return mineDangerCounter(minePosition, area)
}

export default areaDataGenerator