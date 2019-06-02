const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const PORT = process.env.PORT || 5000
const app = new Koa()
const router = new Router()
const Sentry = require('@sentry/node')

const IS_PROD = process.env.NODE_ENV === 'production'

const SHOULD_USE_SENTRY = IS_PROD && process.env.SENTRY_DSN

if (SHOULD_USE_SENTRY) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  })
}

// const oneDayMs = 1000 * 60 * 60 * 24
// const oneYearMs = oneDayMs * 365

router
  .get('/', (ctx, next) => {
    ctx.body = `
    <h1>بسم الله الرحمن الرحيم</h1>
    <h2>Ahlsunnah Radio API</h2>
    <a href="./stations/">stations list</a>
  `
    next()
  })
  .get('/stations', (ctx) => {
    return send(ctx, 'stations.json')
  })
  .get('/public/(.*)', (ctx) => {
    return send(ctx, ctx.path, {
      immutable: true,
      // maxAge: oneYearMs,
    })
  })

app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err) => {
  if (SHOULD_USE_SENTRY) {
    Sentry.captureException(err)
  } else {
    console.error(err)
  }
})

const server = app.listen(PORT, () => {
  if (!IS_PROD) console.log('listening on http://localhost:' + PORT)
})

module.exports = server
