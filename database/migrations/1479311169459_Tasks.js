'use strict'

const Schema = use('Schema')

class TasksSchema extends Schema {

  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.text('name').notNullable()
      table.text('description').notNullable()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }

}

module.exports = TasksSchema
