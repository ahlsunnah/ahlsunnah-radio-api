const Koa = require('koa')
const serve = require('koa-static')
const PORT = process.env.PORT || 5000

const app = new Koa()

app.use(serve('./public'))

app.use(async (ctx) => {
  ctx.body = `
    <h1>بسم الله الرحمن الرحيم</h1>
    <h2>Ahlsunnah Radio API</h2>
    <a href="./station-playlists.json">stations playlists</a>
  `
})

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})
