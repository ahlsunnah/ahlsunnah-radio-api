const server = require('../index')
const request = require('supertest')

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

describe('routes: stations', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/stations/')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.text.length > 0).toBeTruthy()
  })

  test('all station should have an url and a name', async () => {
    const response = await request(server).get('/stations/')
    expect(
      JSON.parse(response.text).every(({url, name}) => url && name),
    ).toBeTruthy()
  })

  test('all img exists', async () => {
    const response = await request(server).get('/stations/')
    await Promise.all(
      JSON.parse(response.text).map(({img}) => {
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
  })
})
