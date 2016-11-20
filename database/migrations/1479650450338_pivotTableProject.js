'use strict'

const Schema = use('Schema')

class PivotTableProjectSchema extends Schema {

  up () {
    this.create('pivotTableProject', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('pivotTableProject')
  }

}

module.exports = PivotTableProjectSchema
