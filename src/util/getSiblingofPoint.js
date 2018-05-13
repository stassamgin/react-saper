function getSiblingOfPoint(targetPoint, area) {
  const { row, col } = targetPoint
  const pointsArray = []

  function arrayPointChecker(currentRow) {
    area[currentRow].forEach((elem, index) => {
      if(index === col || index === col + 1 || index === col - 1) pointsArray.push(elem)
    })
  }

  function arrayRowChecker(start, step) {
    while(step > 0) {
      arrayPointChecker(start++)
      step--
    }
  }

  switch (row) {
    case 0:
      arrayRowChecker(0, 2)
      break
    case area.length - 1:
      arrayRowChecker(row - 1, 2)
      break
    default:
      arrayRowChecker(row - 1, 3)
  }

  return pointsArray
}

export default getSiblingOfPoint