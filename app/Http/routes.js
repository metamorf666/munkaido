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
Route.get('/projects/:id', 'LogController.projectShow')

Route.get('/ownprojects', 'LogController.ownProjectShow')
Route.get('/ownuserprojects', 'LogController.ownUserProjectShow')


Route.get('/projects/:id/:id2', 'LogController.taskShow')

Route.get('/addUser', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/addUser', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')