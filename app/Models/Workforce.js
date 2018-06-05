'use strict'

const Model = use('Model')

class Workforce extends Model {
    area() {
        return this.belongsTo('App/Models/Area')
    }

    employment() {
        return this
            .belongsTo('App/Models/Employment')
     
    }
}

module.exports = Workforce
