'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('points_of_sale', function (table) {
    table.increments('id').unsigned().notNullable().primary()

    table.string('trading_name', 255).notNullable()
    table.string('owner_name', 255).notNullable()
    table.string('document_number', 14).notNullable().unique().comment('brazilian CNPJ document number')
    table.specificType('coverage_area', 'multipolygon').notNullable()
    table.specificType('address', 'point').notNullable()

    table.comment('points of sale table')
    table.engine('InnoDB')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('points_of_sale')
}
