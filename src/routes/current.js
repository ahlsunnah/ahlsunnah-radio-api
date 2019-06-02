const stations = require('../stations.json')
const tryGetStationInfo = require('../tryGetStationInfo')
const cache = require('../cache')

const stationsRoute = async (ctx) => {
  const stationIdList = stations.map(({id}) => id)

  // Retrieve from cache
  const cachedResult = await cache.mget(stationIdList)
  const cachedEntries = Object.entries(cachedResult)

  if (cachedEntries.length == stationIdList.length) {
    ctx.body = cachedEntries.map(([key, value]) => ({
      id: key,
      title: value,
    }))
  } else {
    // Fetch fresh data
    const currentlyPlaying = await Promise.all(
      stations.map((station) =>
        tryGetStationInfo(station.url).then((info) => {
          return {
            id: station.id,
            title: info.title,
          }
        }),
      ),
    )
    ctx.body = currentlyPlaying

    // Save in cache
    currentlyPlaying.forEach(({id, title}) => {
      cache.set(id, title).then()
    })
  }
}

module.exports = stationsRoute
