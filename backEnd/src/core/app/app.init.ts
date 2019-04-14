class Application {
  private server;
  private logger;
  
    constructor({ server,  logger, SocketIo,  containersDockerRoute, ImageDockerRouteEx, ImageDockerRouteIo}) {
      this.server = server;
      this.logger = logger;
    }
  
    async start() {
      await this.server.start();
    }
  }
  
  module.exports = Application;