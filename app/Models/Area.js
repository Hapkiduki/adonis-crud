'use strict'

const Model = use('Model')

class Area extends Model {
    employments() {
         return this
            .belongsToMany('App/Models/Employment')
            .pivotTable('employment_area')
            .withTimestamps()

        /*return this.hasMany('App/Models/Employment')
            .pivotTable('employment_area')*/
    }

    workforces() {
        return this
            .hasMany('App/Models/Workforce')

    }

}

module.exports = Area
