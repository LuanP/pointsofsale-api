'use strict'

const pjson = require('../../package.json')
const responseHandler = require('../helpers/responseHandler')
const error = require('../helpers/responseHandler').errorHandler

/**
 * Method: Generate the standard api response
 */
module.exports = async (ctx, next) => {
  ctx.set('x-api-version', pjson.version)

  try {
    await next()

    if (ctx.status === 200) {
      ctx.body = responseHandler.successResponse(ctx)
    } else if (ctx.status === 404) {
      throw error.resourceNotFound()
    }
  } catch (err) {
    if (err.output && err.output.statusCode && err.output.payload) {
      ctx.status = err.output.statusCode
      ctx.body = err.output.payload
    }

    ctx.app.emit('error', err)
  }
}
