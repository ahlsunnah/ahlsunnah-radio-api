const send = require('koa-send')

// const oneDayMs = 1000 * 60 * 60 * 24
// const oneYearMs = oneDayMs * 365

const publicRoute = (ctx) => {
  return send(ctx, ctx.path, {
    immutable: true,
    // maxAge: oneYearMs,
  })
}

module.exports = publicRoute
