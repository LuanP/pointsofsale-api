'use strict'

const QueryTypes = require('sequelize').QueryTypes
const Sequelize = require('../../helpers/sequelize').Sequelize
const PointOfSaleSchema = require('../../helpers/sequelize').PointOfSale

var PointOfSale = function (properties) { }

PointOfSale.create = async (data) => {
  return PointOfSaleSchema.create(data)
}

PointOfSale.getById = async (id) => {
  return PointOfSaleSchema.findOne({
    where: { id: id }
  })
}

PointOfSale.getByLngLat = async (lng, lat) => {
  return new Promise((resolve, reject) => {
    Sequelize.query(
      `SELECT
        \`id\`,
        \`trading_name\` AS \`tradingName\`,
        \`owner_name\` AS \`ownerName\`,
        \`document_number\` AS \`document\`,
        \`coverage_area\` AS \`coverageArea\`,
        \`address\`
      FROM
        \`points_of_sale\` AS \`PointOfSale\`
      WHERE CONTAINS(
        \`PointOfSale\`.\`coverage_area\`,
        GeomFromText('POINT (${lng} ${lat})'))
      `, { type: QueryTypes.SELECT }
    ).then((pointOfSale) => {
      return resolve(pointOfSale)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}

module.exports = PointOfSale
