'use strict'

const path = require('path')

const currentEnv = process.env.NODE_ENV
if (currentEnv === 'development') {
  require('dotenv').config({path: path.join(__dirname, '..', '..', `.env-${currentEnv.toLowerCase()}`)})
}

// default config
var base = {
  env: currentEnv,
  port: process.env.PORT || 9000,
  knex_dialect: 'mysql2',
  db: {
    name: process.env.DB_NAME || 'pointsofsale',
    username: process.env.DB_USERNAME || 'pointsofsale',
    password: process.env.DB_PASSWORD || 'pointsofsale',
    options: {
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      debug: process.env.DB_DEBUG || false,
      logging: process.env.DB_LOGGING || undefined,
      pool: {
        max: process.env.DB_POOL_MAX || 20,
        min: process.env.DB_POOL_MIN || 5,
        idle: process.env.DB_POOL_IDLE || 10000
      }
    }
  },
  ip: process.env.IP || undefined,
  logType: process.env.LOG_TYPE || 'dev',
  logs: [],
  slack: {},
  apis: {}
}

// override base config with environment
module.exports = base
