'use strict'

const fs = require('fs')

exports.parseWeather = (filepath) => {
  const weatherMapper = function(line) {
    const day = {
      station: line[0],
      date: line[1],
      tmax: parseInt(line[5], 10),
      tmin: parseInt(line[6], 10),
    }
    day.spread = day.tmax - day.tmin
    return day
  }  
  return parseInput(filepath, 2, /\s+/g, weatherMapper, 'UTAH LAKE LEHI UT US')
}

exports.parseSoccer = (filepath) => {
  const clubMapper = function(line) {
    return {
      name: line[0].replace(/^\d*\. /, ''),
      goals: line[10],
      spread: parseInt(line[11].replace(/(\+|-)/, ''))
    }
  }
  
  return parseInput(filepath, 2, /\s{2,}/g, clubMapper)
}

const parseInput = function(filepath, skipLines, columnDelimeter, dataMapper, replaceText) {
  const rawFile = fs.readFileSync(filepath, 'utf8')
  return rawFile
    .split('\n')
    .slice(skipLines)
    .map((line) => {
      if (!line) return null
      if (replaceText) {
        line = line.replace(replaceText, '')
      }
      line = line.split(columnDelimeter)
      return dataMapper(line)
    })
    .filter((day) => Boolean(day))
}
