'use strict'

const R = require('ramda')
const config = require('config')
const db = config.db
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const models = {}

const defaults = {
  logging: config.logType === 'dev' ? console.log : undefined,
  define: {
    classMethods: {
      models: () => models
    },
    underscored: true,
    timestamps: false,
    paranoid: false
  }
}

const sequelize = new Sequelize(db.name, db.username, db.password, R.merge(defaults, db.options))

let resourcesPath = path.join(__dirname, '../resources')
fs.readdirSync(resourcesPath).forEach((resourceName) => {
  let specificResourcePath = path.join(resourcesPath, resourceName)

  fs.readdirSync(specificResourcePath).filter((file) => {
    return (file.indexOf('.schema') >= 0 && file.indexOf('.swp') < 0)
  }).forEach((file) => {
    var model = sequelize.import(path.join(specificResourcePath, file))
    var modelsImported = R.type(model) === 'Array' ? model : [model]

    modelsImported.forEach((modelImported) => {
      models[modelImported.name] = modelImported
    })
  })
})

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate()
  }
})

models.sequelize = sequelize
models.Sequelize = sequelize

module.exports = models
