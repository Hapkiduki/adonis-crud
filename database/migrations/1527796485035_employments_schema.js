'use strict'

const Schema = use('Schema')

class EmploymentsSchema extends Schema {
  up () {
    this.create('employments', (table) => {
      table.increments()
      table.string('description').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('employments')
  }
}

module.exports = EmploymentsSchema
