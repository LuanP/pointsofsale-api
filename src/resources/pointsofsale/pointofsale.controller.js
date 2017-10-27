'use strict'

const Joi = require('joi')
const boom = require('boom')
const CNPJ = require('cpf_cnpj').CNPJ

const models = require('./pointofsale.model')

module.exports.create = async (ctx) => {
  const schema = Joi.object().keys({
    tradingName: Joi.string().max(255).required().example('Adega da Cerveja - Pinheiros'),
    ownerName: Joi.string().max(255).required().example('Zé da Silva'),
    document: Joi.string().max(18).required().example('64.427.162/0001-93'),
    coverageArea: Joi.object().keys({
      type: Joi.string().max(25).required().example('MultiPolygon').required(),
      coordinates: Joi.array().items(
        Joi.array().items(
          Joi.array().items(
            Joi.array().items(Joi.number().required())
          ).required()
        ).required()
      ).required()
    }).required(),
    address: Joi.object().keys({
      type: Joi.string().max(25).required().example('Point').required(),
      coordinates: Joi.array().items(
        Joi.number().required()
      ).required()
    })
  }).required()

  const result = Joi.validate(ctx.request.body, schema, { abortEarly: false })
  if (result.error) {
    throw boom.badRequest(result.error)
  }

  let data = result.value

  if (!CNPJ.isValid(data.document)) {
    throw boom.badRequest('document is invalid. Please provide a valid CNPJ document number')
  }

  // cleans the document making it only contain numbers
  data.document = CNPJ.strip(data.document)

  // check if a row with the document already exists
  await models.checkDuplicityByDocumentNumber(data.document)
    .catch((err) => {
      throw boom.badRequest('duplicated document', err)
    })

  const response = await models.create(data)

  if (!response || response.length === 0) {
    throw boom.badRequest('failed creating object')
  }

  ctx.body = response
  ctx.status = 201
}

module.exports.get = async (ctx) => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().positive().example(1),
    lng: Joi.number().example(-46.57421),
    lat: Joi.number().example(-21.785741)
  }).and('lat', 'lng').nand('lat', 'id').nand('lng', 'id').required()

  const result = Joi.validate(ctx.query, schema, { abortEarly: false })
  if (result.error) {
    throw boom.badRequest(result.error)
  }

  const data = result.value
  let response

  if (data.id) {
    response = await models.getById(data.id)
  } else {
    response = await models.getByLngLat(data.lng, data.lat)
  }

  if (!response || response.length === 0) {
    throw boom.notFound('object was not found')
  }

  ctx.body = response
  ctx.status = 200
}
