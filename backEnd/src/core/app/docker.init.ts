var Docker = require('dockerode');
var fs = require('fs');

module.exports = ({ config, }) => {
    // MPoroume na paroume to locahost docker 
    // kai apo to config.getEnv() DockerHost alla den einai panta locahost
    docker = new Docker({
        host: config.get("docker_ip"), 
        protocol: config.get("docker_protocol"), 
        ca: fs.readFileSync(config.get("docker_pem_path") + 'ca.pem'),
        cert: fs.readFileSync(config.get("docker_pem_path") + 'cert.pem'),
        key: fs.readFileSync(config.get("docker_pem_path") + 'key.pem'),
        port: config.get("docker_port")
    });
    return docker;
  };