const { Router } = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

module.exports = ({ config, containerExpressMiddleware, errorHandler }) => {
  const router = Router();
  const apiRouter = Router();
 
  apiRouter
    .use(bodyParser.json())
    .use(containerExpressMiddleware) // for scopePerRequestExpress
    .use(cors()); // no prod ready :P

  router.use('/', apiRouter);
  router.use(errorHandler);

  return router;
};