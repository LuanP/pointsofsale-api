const assert = require('chai').assert
const expect = require('chai').expect

const app = require('../../server')
const request = require('supertest').agent(app.listen())

const pjson = require('../../../package.json')

describe('Base resource', function () {
  describe('Check API status and ping at / and /ping', function () {
    it('returns the API version, uptime and status 200', function (done) {
      request.get('/')
        .expect(200)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          expect(res.body).to.include.all.keys(['records'])
          expect(res.body.records[0]).to.include.all.keys(['version', 'uptime'])

          assert.strictEqual(err, null, 'error is null')
          assert.strictEqual(res.body.records[0].version, pjson.version, 'response is API version')

          done()
        })
    })

    it('just returns empty records response', function (done) {
      request.get('/ping')
        .expect(200)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          expect(res.body).to.include.all.keys(['records'])
          expect(res.body.records).to.be.an('array')
          expect(res.body.records.length).to.be.equal(0)

          assert.strictEqual(err, null, 'error is null')

          done()
        })
    })
  })

  describe('Check services health at /health', function () {
    it('returns the API version, uptime, status 200 and services health', function (done) {
      request.get('/health')
        .expect(200)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          expect(res.body).to.include.all.keys(['records'])
          expect(res.body.records[0]).to.include.all.keys(['version', 'uptime', 'apis'])

          assert.strictEqual(err, null, 'error is null')
          assert.strictEqual(res.body.records[0].version, pjson.version, 'response is API version')

          done()
        })
    })
  })

  describe('Incorrect path accessed', function () {
    it('returns a 404', function (done) {
      request.get('/incorrect-path')
        .expect(404)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')

          expect(res.body).to.deep.equal({
            'error': 'Not Found',
            'message': 'Resource not found',
            'statusCode': 404
          })

          done()
        })
    })
  })
})
