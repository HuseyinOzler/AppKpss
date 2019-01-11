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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome', 'BotilanGetirController.bot');
Route.on('/ilanlar').render('ilanlarListe');




Route.post('run', "BotilanGetirController.bot");
Route.post('toplamKayit', "BotilanGetirController.toplamKayit");
Route.post('tablosil', "BotilanGetirController.tablosil")







//Api services
Route.group(() => {
  Route.get('ilanlar', 'BotilanGetirController.ilanlar')
}).prefix('api/v1')