'use strict'

const Workforce = use('App/Models/Workforce')
const Area = use('App/Models/Area')
const Employment = use('App/Models/Employment')
const {
    validate
} = use('Validator')

class WorkforceController {

    async index({
        view
    }) {

        const areas = await Area.all()

        const workforces = await Workforce
            .query()
            .with('area')
            .with('employment')
            .fetch()

        
        //console.log(employments.toJSON()[0].employments);
        
        return view.render('home', {
            title: 'Inicio',
            workforces: workforces.toJSON(),
            areas: areas .toJSON()
        })
    }

    async destroy({ session, params, response }) {
        const { id } = params
        const workforce = await Workforce.find(id)
        workforce.delete();
        //console.log(employment.id)
        return response.redirect('back');
    }

    async show({ params }) {
        const { id } = params
        const employments = await Area
            .query()
            .with('employments')
            .where('id', id)
            .fetch()
        return employments.toJSON()[0].employments
    }

    async store({
        request,
        session,
        response
    }) {

        
        const rules = {
            fullname: 'required|min:3',
            email: 'required|email|unique:workforces',
            area_id: 'required',
            employment_id: 'required',
            telephone: 'required',
            address: 'required'
        }

        const messages = {
            required: 'The field is required.',
            'email.unique': 'A Correo Electrónico already exists.'
        }


        const data = request.except(['_csrf'])
        
        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        
        const workforce = await Workforce.create(data)
        console.log(workforce.toJSON().fullname);
        

        return response.redirect('back');
    }
}

module.exports = WorkforceController
