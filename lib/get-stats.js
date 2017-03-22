const getBiggestSpread = (data, spreadField) => {
  return data.reduce((biggest, item) => {
    return biggest[spreadField] > item[spreadField] ? biggest : item
  })
}

const getSmallestSpread = (data, spreadField) => {
  return data.reduce((biggest, item) => {
    return biggest[spreadField] < item[spreadField] ? biggest : item
  })
}

const getAvgSpread = (data, spreadField) => {
  return data.reduce((total, item) => total + item[spreadField], 0) / data.length
}

const getStdDeviation = (data, avg, spreadField) => {
  const squaredAvgDeviation = data.reduce((total, item) => {
    return total + ((item[spreadField] - avg) ** 2)
  }, 0) / data.length
  return Math.sqrt(squaredAvgDeviation)
}

exports.getStats = function(data, spreadField = 'spread') {
  const biggestSpread = getBiggestSpread(data, spreadField)
  const smallestSpread = getSmallestSpread(data, spreadField)
  const avgSpread = getAvgSpread(data, spreadField)
  const stdDeviation = getStdDeviation(data, avgSpread, spreadField)
  return {
    biggestSpread,
    smallestSpread,
    avgSpread,
    stdDeviation,
  }
}