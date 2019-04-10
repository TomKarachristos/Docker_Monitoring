
class DockerContainers {
    constructor({docker}) {
      this.docker = docker;
    }
  
    async getList() {
        docker.listContainers(function (err, containers) {
            containers.forEach(function (containerInfo) {
                console.log("result:");
                console.log(containerInfo)
            });
        });

    }
  }

module.exports = DockerContainers;