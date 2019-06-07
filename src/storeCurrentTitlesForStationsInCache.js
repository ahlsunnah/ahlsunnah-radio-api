const stations = require('./stations.json')
const tryGetStationInfo = require('./tryGetStationInfo')
const cache = require('./cache')

const DEBUG = process.env.DEBUG

const storeCurrentTitlesForStationsInCache = async () => {
  if (DEBUG)
    console.log('fetch current titles for stations and store it in the cache')
  stations.forEach((station) =>
    tryGetStationInfo(station.url).then((info) => {
      cache.set(station.id, info.title)
    }).catch((e) => {
      // silent the error because of sentry
      console.error(e)
    }),
  )
}

module.exports = storeCurrentTitlesForStationsInCache
