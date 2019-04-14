const socketIo = require("socket.io");

module.exports = ({server, logger}) => {
    const io = socketIo(server.getHttp());
    io.origins('*:*')
    io.on('error', function (error) {
      logger.info("Socekt error:", error)
    });
    return io;
  };