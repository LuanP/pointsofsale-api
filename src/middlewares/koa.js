'use strict'

const R = require('ramda')
const logger = require('./log')
const koaLogger = require('koa-bunyan-logger')

module.exports = (app) => {
  app.use(koaLogger(logger))
  app.use(koaLogger.requestIdContext())
  app.use(
    koaLogger.requestLogger({

      // custom fields for both request and response
      updateResponseLogFields: (ctx, err) => {
        if (ctx.res) {
          let body = (ctx.res.body && ctx.res.body.dataValues) || ctx.res.body
          // the line below does:
          // if body is an array, create an obj only with non undefined values and return or the body itself
          body = Array.isArray(body) ? R.map(obj => !R.isNil(obj.dataValues) ? obj.dataValues : obj, body) : body
          if (typeof body === 'object') {
            // limiting registers
            if (Array.isArray(body) && body.length > 50) {
              ctx.body = []
            } else {
              ctx.body = body
            }
          } else {
            ctx.text = body
          }
        }
      }
    })
  )

  // transform all responses to standard pattern
  // sets x-api-version in headers
  app.use(require('./pre-response'))

  app.on('error', (err) => {
    logger.info(err)
  })
}
