function mapMultiArray(multiArray, mapFunction) {
  return multiArray.map(row => row.map(item => mapFunction(item)))
}

export default mapMultiArray