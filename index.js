const Koa = require('koa')
const send = require('koa-send')
const Router = require('koa-router')
const PORT = process.env.PORT || 5000
const app = new Koa()
const router = new Router()

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

const server = app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})

module.exports = server
