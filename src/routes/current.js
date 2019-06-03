const stations = require('../stations.json')
const cache = require('../cache')

const stationsRoute = async (ctx) => {
  const stationIdList = stations.map(({id}) => id)

  // Retrieve from cache
  const cachedResult = await cache.mget(stationIdList)
  const cachedEntries = Object.entries(cachedResult)

  ctx.body = cachedEntries.map(([key, value]) => ({
    id: key,
    title: value,
  }))
}

module.exports = stationsRoute
