'use strict'
const Employment = use('App/Models/Employment')
const { validate } = use('Validator')

class EmploymentController {
    async index({view}){
        let employments = await Employment.all()
        return view.render('employments/index', { title: 'Cargos', employments: employments.toJSON() })
    }

    async store({ request, session, response }) {
        const rules = {
            description: 'required|unique:employments'
        }

        const messages = {
            'description.required': 'Cargo is required to continue.',
            'description.unique': 'A cargo already exists.'
        }

        const data = request.except(['_csrf'])

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')        
        }

        const employment = await Employment.create(data)
        return response.redirect('/employments');
    }

    async destroy({ session, params, response }) {
        const { id } = params
        const employment = await Employment.find(id)
        employment.delete();
        //console.log(employment.id)
        return response.redirect('/employments');
    }
}

module.exports = EmploymentController
