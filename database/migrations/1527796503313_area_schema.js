'use strict'

const Schema = use('Schema')

class AreaSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.string('description').notNullable().unique()
      
      table.timestamps()
    })

    this.create('employment_area', (table) => {
      table.increments()
      table.integer('employment_id').unsigned().references('id').inTable('employments').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('area_id').unsigned().references('id').inTable('areas').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()

    })
  }

  down () {
    this.drop('employment_area')
    this.drop('areas')
  }
}

module.exports = AreaSchema
