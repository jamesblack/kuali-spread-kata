'use strict'

const fs = require('fs')

exports.parseWeather = (filepath) => {
  const rawFile = fs.readFileSync(filepath, 'utf8')
  return rawFile
    .split('\n')
    .slice(2)
    .map((line) => {
      if (!line) return null
      line = line.replace('UTAH LAKE LEHI UT US', '')
      line = line.split(/\s+/g)
      const day = {
        station: line[0],
        date: line[1],
        tmax: parseInt(line[5], 10),
        tmin: parseInt(line[6], 10),
      }
      day.spread = day.tmax - day.tmin
      return day
    })
    .filter((day) => Boolean(day))
}

exports.parseSoccer = (filepath) => {
  const rawFile = fs.readFileSync(filepath, 'utf8')
  return rawFile
    .split('\n')
    .slice(2)
    .map((line) => {
      if (!line) return null
      line = line.replace('UTAH LAKE LEHI UT US', '')
      line = line.split(/\s{2,}/g)
      const club = {
        name: line[0].replace(/^\d*\. /, ''),
        goals: line[10],
        spread: parseInt(line[11].replace(/(\+|-)/, ''))
      }
      return club
    })
    .filter((day) => Boolean(day))
}
