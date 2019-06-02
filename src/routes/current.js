const stations = require('../stations.json')
const tryGetStationInfo = require('../tryGetStationInfo')

const stationsRoute = async (ctx) => {
  const currentlyPlaying = await Promise.all(
    stations.map((station) =>
      tryGetStationInfo(station.url).then((info) => ({
        id: station.id,
        title: info.title,
      })),
    ),
  )
  ctx.body = currentlyPlaying
}

module.exports = stationsRoute
