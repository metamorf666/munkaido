'use strict'

const Schema = use('Schema')

class ProjectsSchema extends Schema {

  up () {
    this.create('projects', (table) => {
      table.increments()
      table.text('name').notNullable()
      table.text('description').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }

}

module.exports = ProjectsSchema
