const Koa = require('koa')
const Router = require('koa-router')
const PORT = process.env.PORT || 5000
const app = new Koa()
const router = new Router()
const CronJob = require('cron').CronJob

const currentRoute = require('./routes/current')
const indexRoute = require('./routes/index')
const publicRoute = require('./routes/public')
const stationsRoute = require('./routes/stations')

const errorHandler = require('./errorHandler')
const storeCurrentTitlesForStationsInCache = require('./storeCurrentTitlesForStationsInCache')

const IS_PROD = process.env.NODE_ENV === 'production'
const CURRENT_TITLES_FETCH_INTERVAL =
  process.env.CURRENT_TITLES_FETCH_INTERVAL || 15

router
  .get('/', indexRoute)
  .get('/current', currentRoute)
  .get('/stations', stationsRoute)
  .get('/public/(.*)', publicRoute)

app.use(router.routes()).use(router.allowedMethods())

app.on('error', errorHandler)

const server = app.listen(PORT, () => {
  if (!IS_PROD) console.log('listening on http://localhost:' + PORT)
})

module.exports = server

new CronJob(
  `*/${CURRENT_TITLES_FETCH_INTERVAL} * * * * *`,
  function() {
    if (!IS_PROD) console.log('Refreshing current titles for all stations')
    storeCurrentTitlesForStationsInCache()
  },
  null,
  true,
  'UTC',
  undefined,
  true,
)
