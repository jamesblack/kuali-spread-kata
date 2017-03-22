'use strict'

const path = require('path')
const express = require('express')
const { parseWeather, parseSoccer } = require('./lib/parse-file')
const { getStats } = require('./lib/get-stats')

const PORT = process.env.PORT || '8000'
const lehiWeatherPath = path.join(__dirname, 'data', 'lehi-weather.txt')
const soccerPath = path.join(__dirname, 'data', 'soccer.txt')
const weatherData = parseWeather(lehiWeatherPath)
const soccerData = parseSoccer(soccerPath)
const app = express()

app.set('json spaces', 2)
app.get('/weather', (req, res, next) => {
  res.json(getStats(weatherData))
})

app.get('/soccer', (req, res, next) => {
  res.json(getStats(soccerData))
})

app.listen(PORT)
  .on('listening', () => console.log(`Server started on port ${PORT}`))
  .on('error', (err) => console.error(err.stack))
