'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

//Route.on('/').render('home', {title: 'Inicio'});
//Route.get('/employments').render('employments/index', {title: 'Cargos'}).as('cargos');

//Route.get('/', '');
//Route.on('/areas').render('areas/index', {title: 'Areas'}).as('areas');

/*Route.get('/employments', async ({ request, view }) => {
    let employments = await Employment.all()
    return view.render('employments/index', { title: 'Cargos', employments: employments.toJSON()})
}).as('cargos')*/

Route.resource('/employments', 'EmploymentController').apiOnly()
Route.resource('/areas', 'AreaController').apiOnly()
Route.resource('/', 'WorkforceController').apiOnly()