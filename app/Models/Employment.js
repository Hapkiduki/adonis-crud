'use strict'

const Model = use('Model')

class Employment extends Model {
    area() {
      /* return this
            .belongsToMany('App/Models/Area')
            .pivotTable('employment_area')
 */
         return this.hasMany('App/Models/Area')
            .pivotTable('employment_area') 

    }
}

module.exports = Employment
