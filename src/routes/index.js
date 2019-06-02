const indexRoute = (ctx, next) => {
  ctx.body = `
    <h1>بسم الله الرحمن الرحيم</h1>
    <h2>Ahlsunnah Radio API</h2>
    <a href="./stations/">stations list</a>
  `
  next()
}

module.exports = indexRoute
