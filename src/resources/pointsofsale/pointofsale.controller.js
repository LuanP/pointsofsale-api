'use strict'

const Joi = require('joi')
const boom = require('boom')

module.exports.create = async (ctx) => {
  const schema = Joi.object().keys({
    tradingName: Joi.string().max(255).required().example('Adega da Cerveja - Pinheiros'),
    ownerName: Joi.string().max(255).required().example('Zé da Silva'),
    document: Joi.string().max(18).required().example('1432132123891/0001'),
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

  // const data = result.value
  // const obj = await models.create(data)

  // if (!obj || obj.length === 0) {
  //   throw boom.badRequest('failed creating object')
  // }

  // ctx.body = obj
  ctx.body = 'unfinished method'
  ctx.status = 201
}
