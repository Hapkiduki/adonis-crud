'use strict'

const Schema = use('Schema')

class WorkforceSchema extends Schema {
  up () {
    this.create('workforces', (table) => {
      table.increments()
      table.string('fullname', 40).notNullable()
      table.string('email', 40).notNullable().unique()
      table.integer('area_id').unsigned().references('id').inTable('areas').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('employment_id').unsigned().references('id').inTable('employments').onDelete('CASCADE').onUpdate('CASCADE')
      table.string('telephone', 12).nullable()
      table.string('address').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('workforces')
  }
}

module.exports = WorkforceSchema
