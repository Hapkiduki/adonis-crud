'use strict'

const Model = use('Model')

class Employment extends Model {
    area() {
        return this.hasMany('App/Models/Area')
            .pivotTable('employment_area')
        //return this.belongsTo('App/Models/Area')
    }
}

module.exports = Employment
