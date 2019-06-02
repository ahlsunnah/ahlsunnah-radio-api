const Sentry = require('@sentry/node')

const IS_PROD = process.env.NODE_ENV === 'production'
const SHOULD_USE_SENTRY = IS_PROD && process.env.SENTRY_DSN

if (SHOULD_USE_SENTRY) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  })
}

const errorHandler = (err) => {
  if (SHOULD_USE_SENTRY) {
    Sentry.captureException(err)
  } else {
    console.error(err)
  }
}

module.exports = errorHandler
