'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
  * register(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.redirect('/')
    }
    if (!request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
      return
    }

    yield response.sendView('register')
  }

  * login(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }


    yield response.sendView('login')
  }

  * doLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password) 

      if (login) {
        response.redirect('/')
        return
      }
    } 
    catch (err) {
      yield request
        .withAll()
        .andWith({errors: [
          {
            message: 'Invalid credentails'
          }
        ]})
        .flash()

      response.redirect('/login')
    }
  }

    * ajaxLogin(request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password) 
      if (login) {
        response.send({ success: true })
        return
      }
    } 
    catch (err) {
      response.send({ success: false })
    }
  }




  * doRegister (request, response) {

    if (!request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
     return
    }

    const registerData = request.except('_csrf');
    if(registerData.isAdmin == 'on'){
      registerData.isAdmin=true;
    }else{
      registerData.isAdmin=false;
    }
    if(registerData.isLeader == 'on'){
      registerData.isLeader=true;
    }else{
      registerData.isLeader=false;
    }
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
      firstName: 'required|alpha_numeric',
      lastName: 'required|alpha_numeric',
      isLeader: 'boolean',
      isAdmin: 'boolean',
    };

    const validation = yield Validator.validateAll(registerData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')

      return
    }

    const user = new User()

    user.username = registerData.username;
    user.email = registerData.email;
    user.firstName = registerData.firstName;
    user.lastName = registerData.lastName;
    user.isLeader = registerData.isLeader;
    user.isAdmin = registerData.isAdmin;
    user.password = yield Hash.make(registerData.password) 
    yield user.save()
    
   // yield request.auth.login(user)

    response.redirect('/')
  }

    * ajaxAddUser (request, response) {

    if (!request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
     return
    }

    const registerData = request.except('_csrf');
    if(registerData.isAdmin == 'on'){
      registerData.isAdmin=true;
    }else{
      registerData.isAdmin=false;
    }
    if(registerData.isLeader == 'on'){
      registerData.isLeader=true;
    }else{
      registerData.isLeader=false;
    }
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
      firstName: 'required|alpha_numeric',
      lastName: 'required|alpha_numeric',
      isLeader: 'boolean',
      isAdmin: 'boolean',
    };

    const validation = yield Validator.validateAll(registerData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.send({ success: false })

      return
    }

    const user = new User()

    user.username = registerData.username;
    user.email = registerData.email;
    user.firstName = registerData.firstName;
    user.lastName = registerData.lastName;
    user.isLeader = registerData.isLeader;
    user.isAdmin = registerData.isAdmin;
    user.password = yield Hash.make(registerData.password) 
    yield user.save()
    
   // yield request.auth.login(user)

    response.send({ success: true })
  }



  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }
}

module.exports = UserController
