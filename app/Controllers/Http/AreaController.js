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

    const area = await Area.create({description:data.description})
      for (const employment_id of data.employment_id) {

        const areaEmployment = await area.employments().attach(employment_id,area.id)
      }

      return response.redirect('back');
  }

  async destroy({ session, params, response }) {
    const { id } = params
    const area = await Area.find(id)
    area.delete();
    //console.log(employment.id)
    return response.redirect('back');
}
}

module.exports = AreaController
