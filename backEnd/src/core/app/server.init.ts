const express = require('express');
var http = require('http');
var cors = require('cors')

class Server {
  private config;
  private express;
  private logger;
  private http;

  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.use(router);
    this.http = http.createServer(this.express);
  }

  async start() {
    return new Promise((resolve) => {
      this.http.listen(this.config.get('nodejs_port'), () => {
          this.logger.info(`[p ${process.pid}] Listening`);
          resolve();
        });
      
    });
  }

  getHttp(){
    return this.http;
  }
}

module.exports = Server;