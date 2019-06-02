const NodeCache = require('node-cache')

const CACHE_STD_TTL = process.env.CACHE_STD_TTL || 10
const cache = new NodeCache({
  stdTTL: CACHE_STD_TTL,
  errorOnMissing: true,
})

const promisify = (fn) => (...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, success) => {
      if (err) reject(err)
      resolve(success)
    }),
  )

module.exports.set = promisify(cache.set)

module.exports.get = promisify(cache.get)

module.exports.mget = promisify(cache.mget)
