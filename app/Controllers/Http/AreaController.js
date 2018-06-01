'use strict'

const Area = use('App/Models/Area')
const Employment = use('App/Models/Employment')
const {
  validate
} = use('Validator')

class AreaController {
  async index({
    view
  }) {

    const employments = await Employment.all()

    const areas = await Area
      .query()
      .with('employments')
      .fetch()

    //.fetch()
    //console.log(areas.toJSON()[0].employments.length )
    //console.log(areas.size())
    //console.log(employments.toJSON())

    return view.render('areas/index', {
      title: 'Areas',
      areas: areas.toJSON(),
      employments: employments.toJSON()
    })
  }

  async store({
    request,
    session,
    response
  }) {
    const rules = {
        description: 'required|unique:areas',
        employment_id: 'required'  
    }

    const messages = {
      'description.required': 'Area is required to continue.',
      'description.unique': 'An area already exists.',
      'employment_id.required': 'Cargo is required to continue.',
    }

      
    const data = request.except(['_csrf'])

    const validation = await validate(data, rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }
    
      const area = new Area();
      area.description = data.description;
      area.save();
      //console.log(data.employment_id);
      //data.description = data.description
//      data.employment_id = data.employment_id[0]
      const areaEmployment = await area.employments().sync([data.employment_id[0]])
      
    //const employment = await Employment.create(data)
      return response.redirect('back');
  }
}

module.exports = AreaController
