const { LoggingWinston } = require("@google-cloud/logging-winston");
const winston = require("winston");
const constants = require("./utils/constants");

let logger;
let logGCP =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";

class LoggingGCP {
  constructor(objs) {
  
    let keyFilename = (objs && objs.keyFilename) || constants.KEY_FILENAME;
    let logName =
      (objs && objs.logName) ||
      process.env.WINSTON_LOG_NAME ||
      process.env.LOG_NAME ||
      "winston_log";
    const errorFormat = winston.format((info) => {
      if (info && info.error instanceof Error) {
        return { ...{ stackTrace: info.error.stack }, info };
      }
      return info;
    });

    logger = winston.createLogger({
      format: winston.format.combine(errorFormat(), winston.format.json()),
      transports: [
        new LoggingWinston({
          keyFilename: keyFilename,
          logName: logName,
        }),
      ],
    });
  }

  /**
   *
   * @param message
   * @param data
   * @param type
   */
  logWinston = (message, data, type = "error") => {
    try {
      if (type === "error") {
        logger.error(message || "ERROR: ", data);
      } else {
        logger.info(message || "INFO: ", data);
      }
    } catch (error) {
      log.error(error);
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  info = (message, data) => {
    try {
      message = "[INFO] - " + message;
      if (logGCP) {
        logger.info(message || "ERROR: ", data);
      } else {
        console.info(message || "ERROR: ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  warning = (message, data) => {
    try {
      message = "[WARNING] - " + message;
      if (logGCP) {
        logger.warning(message || "ERROR: ", data);
      } else {
        console.warn(message || "ERROR: ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  error = (message, data) => {
    try {
      message =
        "[ERROR] - " + message + (message.stack ? "::" + message.stack : "");
      if (logGCP) {
        logger.error(message || "ERROR: ", data);
      } else {
        console.error(message || "ERROR: ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  debug = (message, data) => {
    try {
      message = "[DEBUG] - " + message;
      if (logGCP) {
        logger.info(message || "ERROR: ", data);
      } else {
        console.info(message || "ERROR: ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  static init = () => {
    if (!logger) {
      logger = new LoggingGCP();
    }
    return logger;
  };
}

module.exports = LoggingGCP;
