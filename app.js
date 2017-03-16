'use strict'

const path = require('path')
const express = require('express')
const parseFile = require('./lib/parse-file')

const PORT = process.env.PORT || '8000'
const lehiWeatherPath = path.join(__dirname, 'data', 'lehi-weather.txt')
const soccerPath = path.join(__dirname, 'data', 'soccer.txt')
const weatherData = parseFile.parseWeather(lehiWeatherPath)
const soccerData = parseFile.parseSoccer(soccerPath)
const app = express()

const getBiggestSpread = (data) => {
  return data.reduce((biggest, item) => {
    return biggest.spread > item.spread ? biggest : item
  })
}

const getSmallestSpread = (data) => {
  return data.reduce((biggest, item) => {
    return biggest.spread < item.spread ? biggest : item
  })
}

const getAvgSpread = (data) => {
  return data.reduce((total, item) => total + item.spread, 0) / data.length
}

const getStdDeviation = (data, avg) => {
  const squaredAvgDeviation = data.reduce((total, item) => {
    return total + ((item.spread - avg) ** 2)
  }, 0) / data.length
  return Math.sqrt(squaredAvgDeviation)
}

app.set('json spaces', 2)
app.get('/weather', (req, res, next) => {
  const days = weatherData
  const biggestSpread = getBiggestSpread(days)
  const smallestSpread = getSmallestSpread(days)
  const avgSpread = getAvgSpread(days)
  const stdDeviation = getStdDeviation(days, avgSpread)
  res.json({
    biggestSpread,
    smallestSpread,
    avgSpread,
    stdDeviation,
  })
})

app.get('/soccer', (req, res, next) => {
  const clubs = soccerData
  const biggestSpread = getBiggestSpread(clubs)
  const smallestSpread = getSmallestSpread(clubs)
  const avgSpread = getAvgSpread(clubs)
  const stdDeviation = getStdDeviation(clubs, avgSpread)
  res.json({
    biggestSpread,
    smallestSpread,
    avgSpread,
    stdDeviation,
  })
})

app.listen(PORT)
  .on('listening', () => console.log(`Server started on port ${PORT}`))
  .on('error', (err) => console.error(err.stack))
