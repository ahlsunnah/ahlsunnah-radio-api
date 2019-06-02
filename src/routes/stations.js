const send = require('koa-send')

const stationsRoute = (ctx) => {
  return send(ctx, 'src/stations.json')
}

module.exports = stationsRoute
