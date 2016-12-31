'use strict'

const Route = use('Route')

// Route.get('/hello', function * (req, res) {
//     yield res.sendView('welcome');
// })
// Route.on('/').render('main')
Route.get('/', 'LogController.index')
Route.get('/projects/create', 'LogController.projectCreate').middleware('auth')
Route.post('/projects/create', 'LogController.projectDoCreate').middleware('auth')
Route.get('/projects/:id/create', 'LogController.taskCreate').middleware('auth')
Route.post('/projects/:id/create', 'LogController.taskDoCreate').middleware('auth')
Route.get('/projects/:id/edit', 'LogController.projectEdit').middleware('auth')
Route.post('/projects/:id/edit', 'LogController.projectDoEdit').middleware('auth')
Route.get('/projects/:id/delete', 'LogController.doProjectDelete').middleware('auth')

Route.get('/projects/:id/users', 'LogController.showProjectUsers').middleware('auth')
Route.get('/projects/:id/users/add/:id2', 'LogController.doProjectAddUser').middleware('auth')
Route.get('/projects/:id/users/add', 'LogController.projectAddUser').middleware('auth')
Route.get('/projects/:id/users/:id2/delete', 'LogController.doProjectDeleteUser').middleware('auth')

Route.get('/projects/:id/:id2/users', 'LogController.showTaskUsers').middleware('auth')
Route.get('/projects/:id/:id3/users/add/:id2', 'LogController.doTaskAddUser').middleware('auth')
Route.get('/projects/:id/:id3/users/add', 'LogController.taskAddUser').middleware('auth')
Route.get('/projects/:id/:id3/users/:id2/delete', 'LogController.doTaskDeleteUser').middleware('auth')

Route.get('/projects/:id/log', 'LogController.projectLog').middleware('auth')
Route.get('/projects/:id/:id2/log', 'LogController.taskLog').middleware('auth')
Route.post('/projects/:id/log', 'LogController.doProjectLog').middleware('auth')
Route.post('/projects/:id/:id2/log', 'LogController.doTaskLog').middleware('auth')

Route.get('/projects/:id/:id2/edit', 'LogController.taskEdit').middleware('auth')
Route.post('/projects/:id/:id2/edit', 'LogController.taskDoEdit').middleware('auth')
Route.get('/projects/:id/:id2/delete', 'LogController.doTaskDelete').middleware('auth')
Route.get('/projects/:id', 'LogController.projectShow').middleware('auth')

Route.get('/ownprojects', 'LogController.ownProjectShow').middleware('auth')
Route.get('/ownuserprojects', 'LogController.ownUserProjectShow').middleware('auth')
Route.get('/assignedTasks', 'LogController.assignedTasks').middleware('auth')

Route.get('/projects/:id/:id2', 'LogController.taskShow').middleware('auth')

Route.get('/addUser', 'UserController.register').middleware('auth')
Route.get('/login', 'UserController.login')
Route.post('/addUser', 'UserController.doRegister').middleware('auth')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')


Route.group('ajax', function () {
  Route.delete('/projects/:id/delete', 'LogController.ajaxProjectDelete').middleware('auth')
  Route.delete('/projects/:id/:id2/delete', 'LogController.ajaxTaskDelete').middleware('auth')
  Route.post('/login', 'UserController.ajaxLogin')
  Route.post('/addUser', 'UserController.ajaxAddUser').middleware('auth')
  Route.get('/projects/:id/:id3/users/add/:id2', 'LogController.ajaxTaskAddUser').middleware('auth')
  Route.get('/projects/:id/users/add/:id2', 'LogController.ajaxProjectAddUser').middleware('auth')
  Route.get('/projects/:id/:id3/users/:id2/delete', 'LogController.ajaxTaskDeleteUser').middleware('auth')
  Route.get('/projects/:id/users/:id2/delete', 'LogController.ajaxProjectDeleteUser').middleware('auth')
  Route.post('/projects/:id/:id2/log', 'LogController.ajaxTaskLog').middleware('auth')
  Route.post('/projects/:id/log', 'LogController.ajaxProjectLog').middleware('auth')
}).prefix('/ajax')