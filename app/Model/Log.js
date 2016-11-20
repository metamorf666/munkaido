'use strict'

const Lucid = use('Lucid')

class Log extends Lucid {

 user () {
    return this.belongsTo('App/Model/User')
  }
  project () {
    return this.belongsTo('App/Model/Project')
  }

  task () {
    return this.belongsTo('App/Model/Task')
  }

}

module.exports = Log
