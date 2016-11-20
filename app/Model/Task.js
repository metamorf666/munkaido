'use strict'

const Lucid = use('Lucid')

class Task extends Lucid {
  project  () {
    return this.belongsTo('App/Model/Project')
  }

  logs () {
        return this.hasMany('App/Model/Log')
    }

  users () {
    return this.belongsToMany('App/Model/User', 'pivotTableTask')
  }
}

module.exports = Task
