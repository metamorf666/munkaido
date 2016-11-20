'use strict'

const Lucid = use('Lucid')

class Project extends Lucid {
    tasks () {
        return this.hasMany('App/Model/Task')
    }

    logs () {
        return this.hasMany('App/Model/Log')
    }

    leader  () {
    return this.belongsTo('App/Model/User')
  }

  users () {
    return this.belongsToMany('App/Model/User', 'pivotTableProject')
  }
}

module.exports = Project
