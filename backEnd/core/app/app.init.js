class Application {
    constructor({ server, dockerContainersService, logger  }) {
      this.server = server;
      this.logger = logger;
      this.DockerContainers = dockerContainersService
    }
  
    async start() {
      console.log("start app")
      await this.server.start();
      await this.DockerContainers.getList();
    }
  }
  
  module.exports = Application;