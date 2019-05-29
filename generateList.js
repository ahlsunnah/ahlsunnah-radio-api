const collectionFolder = './public/assets/'
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
    const path = '/assets/' + file
    if (ext === 'm3u') {
      stationsObj[name].url = ''
    } else {
      stationsObj[name].img = path
    }
    stationsObj[name].name = name
  }
})

function isArabic(text) {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/
  result = pattern.test(text)
  return result
}

const stations = Object.values(stationsObj)
  //   .filter(({url}) => !!url)
  .sort((a, b) => {
    if (isArabic(a.name) && !isArabic(b.name)) return -1
    if (!isArabic(a.name) && isArabic(b.name)) return 1
    if (a.name > b.name) return 1
    return -1
  })

fs.writeFileSync('./public/station-playlists.json', JSON.stringify(stations))
console.log(stations)
