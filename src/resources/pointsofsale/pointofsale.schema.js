'use strict'

const R = require('ramda')

module.exports = function (sequelize, DataTypes) {
  let PointOfSale = sequelize.define('PointOfSale', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tradingName: {
      type: DataTypes.STRING(255),
      field: 'trading_name',
      allowNull: false
    },
    ownerName: {
      type: DataTypes.STRING(255),
      field: 'owner_name',
      allowNull: false
    },
    documentNumber: {
      type: DataTypes.STRING(14),
      field: 'document_number',
      allowNull: false
    },
    coverageArea: {
      type: DataTypes.GEOMETRY('MULTIPOLYGON'),
      field: 'coverage_area',
      allowNull: false
    },
    address: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    }
  }, {
    tableName: 'points_of_sale',
    instanceMethods: {
      toJSON: function () {
        return R.pickBy((item) => !R.isNil(item) && !R.isEmpty(item), this.dataValues)
      }
    }
  })

  return PointOfSale
}
