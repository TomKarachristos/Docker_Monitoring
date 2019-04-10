const { Router } = require('express');


module.exports = ({ config, containerMiddleware, errorHandler }) => {
  const router = Router();
  console.log(router)
  /* TODO make a working monitor istanbul ignore if  
  if(config.env === 'development') {
    router.use(statusMonitor());
  }
  */
  const apiRouter = Router();

  apiRouter
    .use(containerMiddleware)
    // what is this .use('/docs', swaggerMiddleware); ?

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  //apiRouter.use('/users', controller('user/UsersController'));

  router.use('/api', apiRouter);

  router.use(errorHandler);

  return router;
};