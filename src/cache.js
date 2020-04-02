const NodeCache = require('node-cache')

const CACHE_STD_TTL = process.env.CACHE_STD_TTL || 60
const cache = new NodeCache({
  stdTTL: CACHE_STD_TTL,
  errorOnMissing: true,
})

module.exports = cache
