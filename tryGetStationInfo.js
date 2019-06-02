const internetRadio = require('node-internet-radio')
const promiseRetry = require('promise-retry')

const getStationInfo = (url) =>
  new Promise((resolve, reject) => {
    internetRadio.getStationInfo(
      url,
      (error, info) => {
        if (error) reject(error)
        return resolve(info)
      },
      internetRadio.StreamSource,
    )
  })

const tryGetStationInfo = (url) =>
  promiseRetry(async (retry, number) => {
    try {
      const info = await getStationInfo(url)
      if (info.title) {
        // console.log('tried: ' + number)
        return info
      }
      // Some station give an empty string sometimes
      retry()
    } catch (e) {
      retry()
    }
  })

module.exports = tryGetStationInfo
