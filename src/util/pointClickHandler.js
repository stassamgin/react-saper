import getSiblingOfPoint from './getSiblingofPoint'
import mapMultiArray from './mapMultiArray'

function pointClickHandler(startPoint, area) {
  let checkedPointsId = new Set()

  function recursivePointChecker (pointsArray, reserveId) {
    checkedPointsId.add(reserveId)

    pointsArray.forEach( item => {
      if (checkedPointsId.has(item.id))return
      if (item.value > 0) {
        checkedPointsId.add(item.id)
      }
      if (item.value === 0) {
        const {row, col} = item
        recursivePointChecker(getSiblingOfPoint({row, col}, area), item.id)
      }
    })
  }
  recursivePointChecker([startPoint])
  return mapMultiArray(area,
    (item) => {
      if(!checkedPointsId.has(item.id)) return item
      return Object.assign({...item}, {open:true})
    })
}

export default pointClickHandler