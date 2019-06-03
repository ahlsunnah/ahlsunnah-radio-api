const stations = require('./stations.json')
const tryGetStationInfo = require('./tryGetStationInfo')
const cache = require('./cache')

const storeCurrentTitlesForStationsInCache = async () => {
  stations.forEach((station) =>
    tryGetStationInfo(station.url).then((info) => {
      cache.set(station.id, info.title)
    }),
  )
}

module.exports = storeCurrentTitlesForStationsInCache
