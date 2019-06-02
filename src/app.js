const Koa = require('koa')
const Router = require('koa-router')
const PORT = process.env.PORT || 5000
const app = new Koa()
const router = new Router()

const indexRoute = require('./routes/index')
const stationsRoute = require('./routes/stations')
const publicRoute = require('./routes/public')
const errorHandler = require('./errorHandler')

const IS_PROD = process.env.NODE_ENV === 'production'

router
  .get('/', indexRoute)
  .get('/stations', stationsRoute)
  .get('/public/(.*)', publicRoute)

app.use(router.routes()).use(router.allowedMethods())

app.on('error', errorHandler)

const server = app.listen(PORT, () => {
  if (!IS_PROD) console.log('listening on http://localhost:' + PORT)
})

module.exports = server
