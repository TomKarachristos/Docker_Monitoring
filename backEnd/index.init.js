const container = require('./compositionRoot.init');

const app = container.resolve('app');

app
  .start()
  .catch((error) => {
    app.logger.error(error.stack);
    process.exit();
  });
