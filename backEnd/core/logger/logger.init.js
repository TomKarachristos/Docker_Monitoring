const Log4js = require("log4js");

module.exports = ({ config }) => {
  // TODO put this to config
  Log4js.configure({
    appenders: {
      everything: { 
        type: "file", 
        filename: "all-the-logs.log" 
      }
    },
    categories: {
      default: { 
        appenders: ["everything"], 
        level: "debug" 
      }
    }
  });

  return Log4js.getLogger();
};
