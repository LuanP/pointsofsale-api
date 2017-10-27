const R = require('ramda')
const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon')
const app = require('../../server')
const request = require('supertest').agent(app.listen())
const pjson = require('../../../package.json')
const models = require('./pointofsale.model')
const PointOfSale = require('../../helpers/sequelize').PointOfSale

const defaultObj = {
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '64.427.162/0001-93',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741]
  }
}

const cleanedDocumentNumber = '64427162000193'

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
            message: '"value" is required'
          })

          done()
        })
    })

    it('POST with object body - raises joi validation error', (done) => {
      request.post('/v1/pointsofsale')
        .send({})
        .expect(400)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')

          expect(res.body).to.deep.equal({
            statusCode: 400,
            error: 'Bad Request',
            message: 'child "tradingName" fails because ["tradingName" is required]. child "ownerName" fails because ["ownerName" is required]. child "document" fails because ["document" is required]. child "coverageArea" fails because ["coverageArea" is required]'
          })

          done()
        })
    })

    it('POST with invalid document (CNPJ) - returns bad request 400', (done) => {
      let clonedObj = R.clone(defaultObj)
      clonedObj.document = '1432132123891/0001' // invalid CNPJ document number

      request.post('/v1/pointsofsale')
        .send(clonedObj)
        .expect(400)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')

          expect(res.body).to.deep.equal({
            statusCode: 400,
            error: 'Bad Request',
            message: 'document is invalid. Please provide a valid CNPJ document number'
          })

          done()
        })
    })

    it('POST with duplicated document (CNPJ) - returns bad request 400', (done) => {
      let stub = sinon.stub(PointOfSale, 'findOne').throws()
      let spy = sinon.spy(models, 'checkDuplicityByDocumentNumber')

      request.post('/v1/pointsofsale')
        .send(defaultObj)
        .expect(400)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')

          sinon.assert.calledOnce(stub)
          assert(spy.calledOnce)
          assert(spy.calledWith(cleanedDocumentNumber))

          expect(res.body).to.deep.equal({
            statusCode: 400,
            error: 'Bad Request',
            message: 'duplicated document'
          })

          stub.restore()
          models.checkDuplicityByDocumentNumber.restore()

          done()
        })
    })

    it('POST successfully create a point of sale - returns created 201', (done) => {
      let stub = sinon.stub(models, 'checkDuplicityByDocumentNumber').resolves()
      let spy = sinon.spy(models, 'create')

      const clonedObj = R.clone(defaultObj)
      clonedObj.document = cleanedDocumentNumber

      let resultObj = R.clone(clonedObj)
      resultObj.id = 1

      let stub2 = sinon.stub(PointOfSale, 'create').resolves(resultObj)

      request.post('/v1/pointsofsale')
        .send(defaultObj)
        .expect(201)
        .expect('x-api-version', pjson.version)
        .end((err, res) => {
          assert.strictEqual(err, null, 'error is null')
          assert(stub.calledWith(cleanedDocumentNumber))

          assert(spy.calledOnce)
          assert(spy.calledWith(clonedObj))

          expect(res.body).to.be.an('object').to.have.own.property('id')
          expect(res.body).to.deep.include(clonedObj)

          stub.restore()
          stub2.restore()
          models.create.restore()

          done()
        })
    })
  })
})
