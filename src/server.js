'use strict'

// default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// bootstrap server
const Koa = require('koa')
const config = require('config')

const app = new Koa()

require('./middlewares/koa')(app)
require('./routes')(app)

// start server
if (!module.parent) {
  app.listen(config.port, config.ip, function () {
    console.log('Koa server listening on %d, in %s mode', config.port, config.env)
  })
}

// expose app
exports = module.exports = app
