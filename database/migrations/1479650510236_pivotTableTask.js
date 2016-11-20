'use strict'

const Schema = use('Schema')

class PivotTableTaskSchema extends Schema {

  up () {
    this.create('pivotTableTask', (table) => {
      table.increments()
      table.integer('task_id').unsigned().references('id').inTable('tasks')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('pivotTableTask')
  }

}

module.exports = PivotTableTaskSchema
