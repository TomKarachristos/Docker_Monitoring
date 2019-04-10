const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');
var conf = require('./config.js');
var logger = require ('./core/logger/logger.init.js')
var router = require('./core/app/router.init')
var dockerContainersService = require('./features/DockerContainers/DockerContainers.service')
var errorHandler = require('./core/app/errorHandler.init')
var server = require('./core/app/server.init')
var application = require('./core/app/app.init')
var docker = require('./core/app/docker.init')
console.log("compositionRoot");


const container = createContainer();

console.log("compositionRoot2");

container
  .register({
    app: asClass(application).singleton(),
    server: asClass(server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    docker: asFunction(docker).singleton()
  })
  .register({
    config: asValue(conf)
  });

// Middlewares
container
 /* .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })*/
  .register({
    containerMiddleware: asValue(scopePerRequest(container)), // thats nice!
    errorHandler: asValue(errorHandler)
  });

// Operations
container.register({
  dockerContainersService: asClass(dockerContainersService),
  dockerContainersService: asClass(dockerContainersService),
});

/*
container.register({
  userSerializer: asValue(UserSerializer)
});*/

module.exports = container;