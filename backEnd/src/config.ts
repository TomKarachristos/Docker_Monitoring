var convict = require('convict');
require('dotenv').config()

// Define a config schema
var conf = convict({
  // TODO MAKE THIS TYPESRIPT TYPING 
  docker_ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "docker_ip",
  },
  docker_protocol: {
    doc: "Protocol that will be used.",
    format: String,
    default: "https",
    env: "docker_protocol"
  },
  docker_port: {
    doc: "The port to bind.",
    format: "port",
    default: 2376,
    env: "docker_protocol"
  },
  docker_pem_path: {
    doc: "Where to find the .pem files",
    format: String,
    default: 0,
    env: "PEM_PATH"
  },
  nodejs_port: {
    doc: "The port to bind.",
    format: "port",
    default: 5858,
    env: "docker_protocol"
  }
});
 
var env = process.env.NODE_ENV || 'development';
conf.loadFile('./src/config/' + env + '.json'); // TODO 
conf.validate({allowed: 'strict'});
 
module.exports = conf;