'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  recipes () {
    return this.hasMany('App/Model/Recipe')
  }

  tasks () {
        return this.belongsToMany('App/Model/Task','pivotTableTask')
    }

    project () {
    return this.belongsToMany('App/Model/Project', 'pivotTableProject')
  }

}

module.exports = User
