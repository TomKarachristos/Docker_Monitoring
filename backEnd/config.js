var convict = require('convict');
require('dotenv').config()

// Define a config schema
var conf = convict({
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 0,
    env: "PORT"
  },
  pem_path: {
    doc: "Where to find the .pem files",
    format: String,
    default: 0,
    env: "PEM_PATH"
  }
});
 
var env = process.env.NODE_ENV || 'development';
console.log(env);
conf.loadFile('./config/' + env + '.json');
 
conf.validate({allowed: 'strict'});
 
module.exports = conf;