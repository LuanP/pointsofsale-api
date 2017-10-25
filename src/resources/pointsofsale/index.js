'use strict'

const router = require('koa-router')()
const controller = require('./pointofsale.controller')

router.post('/', controller.create)
router.get('/', controller.get)

module.exports = router.routes()
