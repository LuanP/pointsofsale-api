'use strict'

const router = require('koa-router')()
const controller = require('./pointofsale.controller')

router.post('/', controller.create)

module.exports = router.routes()
