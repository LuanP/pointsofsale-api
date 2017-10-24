const assert = require('chai').assert
const expect = require('chai').expect
const app = require('../../server')
const request = require('supertest').agent(app.listen())

const pjson = require('../../../package.json')
// const PointOfSale = require('../../helpers/sequelize').PointOfSale

describe('Points of sale resource', () => {
  describe('creating a point of sale', () => {
    it('POST without body - raises joi validation error', (done) => {
      request.post('/v1/pointsofsale')
        .expect(400)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')

          expect(res.body).to.deep.equal({
            statusCode: 400,
            error: 'Bad Request',
            message: '"value" is required',
            data: [{ message: '"value" is required', path: 'value' }]
          })

          done()
        })
    })
  })
})
