const collectionFolder = './public/collection/'
const fs = require('fs')

const stationsObj = {}

const acceptedExtensionsRE = /m3u|jpe?g|png/

fs.readdirSync(collectionFolder).forEach((file) => {
  const parts = file.split('.')

  if (parts.length < 2) return
  const [name, ext] = parts
  if (acceptedExtensionsRE.test(ext)) {
    if (!stationsObj[name]) {
      stationsObj[name] = {}
    }
    const path = '/collection/' + file
    if (ext === 'm3u') {
      stationsObj[name].url = path
    } else {
      stationsObj[name].img = path
    }
  }
})

function isArabic(text) {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/
  result = pattern.test(text)
  return result
}

const stations = Object.values(stationsObj)
  .filter(({url}) => !!url)
  .sort((a, b) => {
    if (isArabic(a.url) && !isArabic(b.url)) return -1
    if (!isArabic(a.url) && isArabic(b.url)) return 1
    if (a.url > b.url) return 1
    return -1
  })

fs.writeFileSync('./public/stations.json', JSON.stringify(stations))
console.log(stations)
