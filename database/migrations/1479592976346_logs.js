'use strict'

const Schema = use('Schema')

class LogSchema extends Schema {

  up () {
    this.create('logs', (table) => {
      table.increments()
      table.integer('hours').notNullable()
      table.text('description')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('task_id').unsigned().references('id').inTable('tasks')
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }

}

module.exports = LogSchema
