const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest: scopePerRequestExpress} = require('awilix-express');
var conf = require('./config');
var logger = require ('./core/logger/logger.init')
var router = require('./core/app/router.init')
var containersDockerService = require('./features/containersDocker/ContainersDockerService')
var errorHandler = require('./core/app/errorHandler.init')
var server = require('./core/app/server.init')
var application = require('./core/app/app.init')
var docker = require('./core/app/docker.init')
var containerDockerRoute = require('./features/containersDocker/Containers.Docker.route.io')
var socketIoValue = require("./core/app/socketIo.init");
var ImageDockerRouteEx = require('./features/ImagesDocker/imageDocker.route.ex')
var imageDockerService = require('./features/ImagesDocker/imageDockers.service')
var ImageDockerRouteIo = require('./features/ImagesDocker/imageDocker.route.io')

const resolverContainer = createContainer();

resolverContainer
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

resolverContainer
  .register({
    containerExpressMiddleware: asValue(scopePerRequestExpress(resolverContainer)), 
    SocketIo: asFunction(socketIoValue).singleton(),
    errorHandler: asValue(errorHandler)
  });

resolverContainer.register({
  containersDockerService: asClass(containersDockerService).singleton(),
  containersDockerRoute: asClass(containerDockerRoute).singleton(),
  ImageDockerRouteEx: asClass(ImageDockerRouteEx).singleton(),
  ImageDockerService: asClass(imageDockerService).singleton(),
  ImageDockerRouteIo: asClass(ImageDockerRouteIo).singleton()
});

module.exports = resolverContainer;
