const express = require('express');

class Server {
  constructor({ config, router, logger, dockerContainersService }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.use(router);
    this.DockerContainers = dockerContainersService;
  }

  async start() {
    await this.DockerContainers.getList();
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.port, () => {

          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;