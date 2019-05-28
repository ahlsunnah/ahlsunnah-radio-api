const Koa = require('koa')
// const path = require('path');
const PORT = process.env.PORT || 5000

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(PORT)
