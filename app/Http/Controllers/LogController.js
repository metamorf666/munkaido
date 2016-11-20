'use strict'

const Database = use('Database')
const Log = use('App/Model/Log')
const Project = use('App/Model/Project')
const Task = use('App/Model/Task')
const User = use('App/Model/User')
const Validator = use('Validator')

class LogController {

  * index(request, response) {
    // const categories = yield Database.from('categories').select('*');
    // response.send(categories)

    const projects = yield Project.all()

    for(let project of projects) {
      const tasks = yield project.tasks().fetch();
      project.topTasks = tasks.toJSON();
    }

    yield response.sendView('main', {
      projects: projects.toJSON()
    })  
  }

* showProjectUsers(request, response) {
    // const categories = yield Database.from('categories').select('*');
    // response.send(categories)
    const id = request.param('id');
    const project = yield Project.find(id);
    yield project.related('users').load();

    yield response.sendView('projectUsers', {
      project: project.toJSON()
    })  
  }

  * showTaskUsers(request, response) {
    // const categories = yield Database.from('categories').select('*');
    // response.send(categories)
    const id = request.param('id');
    const id2 = request.param('id2');
    const project = yield Project.find(id);
    const task = yield Task.find(id2);
    yield task.related('users').load();

    yield response.sendView('taskUsers', {
      project: project.toJSON(),
      task: task.toJSON()
    })  
  }


  * projectCreate (request, response) {
    yield response.sendView('projectCreate', {
    });
  }

  * projectDoCreate (request, response) {
    const projectData = request.except('_csrf');

    const rules = {
      name: 'required',
      description: 'required'

    };

    const validation = yield Validator.validateAll(projectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    projectData.user_id = request.currentUser.id
    const project = yield Project.create(projectData)
    // response.send(recipe.toJSON())
    response.redirect('/')
  }

  * taskCreate (request, response) {
    yield response.sendView('taskCreate', {
    });
  }

  * taskDoCreate (request, response) {
    const id = request.param('id');
    const projectData = request.except('_csrf');
    const rules = {
      name: 'required',
      description: 'required'

    };

    const validation = yield Validator.validateAll(projectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    projectData.project_id = id;
    const task = yield Task.create(projectData)
    // response.send(recipe.toJSON())
    response.redirect('/')
  }

  * projectEdit (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);
    // console.log(recipe.toJSON())

    if (request.currentUser.id !== project.user_id) {
      response.unauthorized('Access denied.')
      return
    }


    yield response.sendView('projectEdit', {
      project: project.toJSON(),
    });
  }

  * projectDoEdit (request, response) {
     const projectData = request.except('_csrf');

    const rules = {
      name: 'required',
      description: 'required'

    };

    const validation = yield Validator.validateAll(projectData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    const id = request.param('id');
    const project = yield Project.find(id);

    project.name = projectData.name;
    project.description = projectData.description; 

    yield project.save()
    
    response.redirect('/')
  }


    * taskEdit (request, response) {
    const id2 = request.param('id2');
    const id = request.param('id');
    const task = yield Task.find(id2);
    const project = yield Project.find(id);
    // console.log(recipe.toJSON())

    if (request.currentUser.id !== project.user_id) {
      response.unauthorized('Access denied.')
      return
    }


    yield response.sendView('taskEdit', {
      task: task.toJSON(),
    });
  }

  * taskDoEdit (request, response) {
     const taskData = request.except('_csrf');

    const rules = {
      name: 'required',
      description: 'required'

    };

    const validation = yield Validator.validateAll(taskData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    const id2 = request.param('id2');
    const task = yield Task.find(id2);

    task.name = taskData.name;
    task.description = taskData.description; 

    yield task.save()
    
    response.redirect('/')
  }

  * projectShow (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);
    
    //const tasks = yield project.tasks().fetch();
   // const leader = yield project.leader().fetch();
    //project.tasks = tasks.toJSON();
    //project.leader = leader.toJSON();
    yield project.related('tasks').load();
    yield project.related('leader').load();
    yield project.related('logs').load();
    yield project.related('users').load();
    // response.send(recipe.toJSON())
    var canLog = false;
    for(let user of project.toJSON().users) {
     if(user.id == request.currentUser.id) canLog = true;
    }


    yield response.sendView('projectShow', {
      project: project.toJSON(),
      canLog : canLog

    })
  }

  * doProjectAddUser (request, response) {
    const id = request.param('id');
    const id2 = request.param('id2');
    const project = yield Project.find(id);
    const user = yield User.find(id2)

    yield project.users().attach([user.id]);

    response.redirect('back')
  }

  * doProjectDeleteUser (request, response) {
    const id = request.param('id');
    const id2 = request.param('id2');
    const project = yield Project.find(id);
    const user = yield User.find(id2)

    yield project.users().detach([user.id]);

    response.redirect('back')
  }

  * projectAddUser (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);
    yield project.related('users').load();
    
   
   // fixme
    const users2 = [];
    const users3 = project.toJSON().users;
    const users = yield User.all()
    
    var exist = false;
    for(let user of users){
      if(!user.isAdmin && !user.isLeader){
        exist = false;
        for(let user4 of users3){
          if(user4.id == user.id) exist = true;
        }
        if(!exist) users2.push(user);
      }
    }
    
    yield response.sendView('projectAddUsers', {
      users: users2,
      project: project,
    })  
  }

  * doTaskAddUser (request, response) {
    const id = request.param('id');
    const id2 = request.param('id2');
    const id3 = request.param('id3');
    const project = yield Project.find(id);
    const user = yield User.find(id2)
    const task = yield Task.find(id3);
    yield task.users().attach([user.id]);
    
    response.redirect('back')
  }

  * doTaskDeleteUser (request, response) {
    const id = request.param('id');
    const id2 = request.param('id2');
    const id3 = request.param('id3');
    const project = yield Project.find(id);
    const user = yield User.find(id2)
    const task = yield Task.find(id3);
    yield task.users().detach([user.id]);

    response.redirect('back')
  }

  * taskAddUser (request, response) {
    const id = request.param('id');
    const id3 = request.param('id3');
    const task = yield Task.find(id3);
    const project = yield Project.find(id);
    yield task.related('users').load();
    
   
   // fixme
    const users2 = [];
    const users3 = task.toJSON().users;
    const users = yield User.all()
    
    var exist = false;
    for(let user of users){
      if(!user.isAdmin && !user.isLeader){
        exist = false;
        for(let user4 of users3){
          if(user4.id == user.id) exist = true;
        }
        if(!exist) users2.push(user);
      }
    }
    
    yield response.sendView('taskAddUser', {
      users: users2,
      project: project,
      task:task.toJSON()
    })  
  }

  * ownProjectShow (request, response) {
    if (!request.currentUser.isLeader) {
      response.unauthorized('Access denied.')
      return
    }

    const id = request.currentUser.id;

   const projects = yield Project.query()
      .where(function () {
      this.where('user_id', id)
      }).with('tasks').fetch()

    yield response.sendView('ownProjects', {
      projects: projects.toJSON()
    })  

  }

  * ownUserProjectShow (request, response) {
    

    const id = request.currentUser.id;
    const user = yield User.find(id);
    yield user.related('project').load();
    yield response.sendView('ownUserProjects', {
      projects: user.toJSON()
    })  

  }

  

  * taskShow (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);
    const id2 = request.param('id2');
    const task = yield Task.find(id2);
    yield task.related('logs').load();
    yield task.related('users').load();
    yield project.related('leader').load();
    project.task = task.toJSON();
    //yield recipe.related('category').load();
    // response.send(recipe.toJSON())
    var canLog = false;
    for(let user of task.toJSON().users) {
     if(user.id == request.currentUser.id) canLog = true;
    }


    yield response.sendView('taskShow', {
      project: project.toJSON(),
      logs: task.logs,
      canLog: canLog
    })
  }

  * doProjectDelete (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);

    if (request.currentUser.id !== project.user_id) {
      response.unauthorized('Access denied.')
      return
    }

    yield project.delete()
    response.redirect('/')
  }

  * doTaskDelete (request, response) {
    const id = request.param('id');
    const project = yield Task.find(id);

    if (request.currentUser.id !== project.leader) {
      response.unauthorized('Access denied.')
      return
    }

    yield project.delete()
    response.redirect('back')
  }

  * taskLog (request, response) {
    yield response.sendView('logCreate', {
    });
  }

  * doTaskLog (request, response) {
    const id = request.param('id');
    const id2 = request.param('id2');
    const project = yield Project.find(id);
    const task = yield Task.find(id2);

    const logData = request.except('_csrf');
    const rules = {
      hours: 'required|number',

    };

    const validation = yield Validator.validateAll(logData, rules)

/*
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
    */

    logData.project_id = id;
    logData.user_id = request.currentUser.id;
    logData.task_id = id2;
    const log = yield Log.create(logData)
    // response.send(recipe.toJSON())
    response.redirect('/projects/'+project.id)
  }

    * projectLog (request, response) {
    yield response.sendView('logCreate', {
    });
  }

  * doProjectLog (request, response) {
    const id = request.param('id');
    const project = yield Project.find(id);

    const logData = request.except('_csrf');
    const rules = {
      hours: 'required|number'
    };
    
    logData.user_id = request.currentUser.id;
    logData.project_id = id;
    const validation = yield Validator.validateAll(logData, rules)
/*
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
*/
  
    
    const log = yield Log.create(logData)
    // response.send(recipe.toJSON())
    response.redirect('/projects/'+project.id)
  }


}

module.exports = LogController
