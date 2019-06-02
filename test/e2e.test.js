const server = require('../index')
const request = require('supertest')
const stations = require('../src/stations.json')
const imgRE = /image\/(png|jpeg)/

afterEach(() => {
  server.close()
})
describe('routes: index', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('text/html')
    expect(response.text.includes('بسم الله الرحمن الرحيم')).toBeTruthy()
  })
})

describe('routes: public/privacy-policy', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/public/privacy-policy.txt')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('text/plain')
    expect(response.text.length > 0).toBeTruthy()
  })
})

describe('routes: stations', async () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/stations/')

    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.text.length > 0).toBeTruthy()
  })

  test.each(['id', 'url', 'name', 'img', 'website'])(
    'all stations should have a %s',
    async (property) => {
      const response = await request(server).get('/stations/')
      expect(
        JSON.parse(response.text).every(
          (station) => station[property] !== undefined,
        ),
      ).toBeTruthy()
    },
  )
})

describe('All imgs in stations file exists', () =>
  test('all img exists', async () => {
    await Promise.all(
      stations.map(({img}) => {
        if (img) {
          return request(server)
            .get(img)
            .then((res) => {
              expect(
                res.type,
                `${img} doesn't match an image type, it is ${res.type}`,
              ).toMatch(imgRE)
              expect(
                res.status,
                `${img} doesn't respond with 200 status, but ${res.status}`,
              ).toEqual(200)
              return true
            })
            .catch((e) => {
              console.error(`failed for url: "${img}"`)
              console.error(e)
            })
        } else return true
      }),
    )
  }))
