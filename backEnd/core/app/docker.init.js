var Docker = require('dockerode');
var fs = require('fs');

module.exports = ({ config, containerMiddleware, errorHandler }) => {
    // MPoroume na ta parome kai apo to config.getEnv() DockerHost
    docker = new Docker({
        host: config.get("ip"), // TODO lets this be constant 
        protocol: 'https', // TODO this too can go to the config
        ca: fs.readFileSync(config.get("pem_path") + 'ca.pem'),
        cert: fs.readFileSync(config.get("pem_path") + 'cert.pem'),
        key: fs.readFileSync(config.get("pem_path") + 'key.pem'),
        port: config.get("port")
    });
    return docker;
  };