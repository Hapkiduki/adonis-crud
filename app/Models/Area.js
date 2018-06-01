'use strict'

const Model = use('Model')

class Area extends Model {
    employments() {
        return this
            .belongsToMany('App/Models/Employment')
            .pivotTable('employment_area')
        
        //return this.hasMany('App/Models/Employment')
    }
    
}

module.exports = Area
