const { LoggingWinston } = require("@google-cloud/logging-winston");
const winston = require("winston");
const constants = require("./common/constants");
const jsonStringify = require("fast-safe-stringify");

let logger;
let instance;

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

    const errorFormat = {
      transform(info) {
        const { timestamp, label, message } = info;
        const level = info[Symbol.for("level")];
        const args = info[Symbol.for("splat")];
        const strArgs = args.map(jsonStringify).join(" ");
        info[
          Symbol.for("message")
        ] = `${timestamp} [${label}] ${level}: ${message} ${strArgs}`;

        if (info && info.error instanceof Error) {
          return { ...{ stackTrace: info.error.stack }, info };
        }

        return info;
      },
    };

    logger = winston.createLogger({
      format: winston.format.combine(
        errorFormat,
        winston.format.json(),
        winston.format.timestamp()
      ),
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
    message = message || (data && data.error && data.error.message);

    if (typeof data !== "object") message += data;

    if (type === "error") {
      winstonLogger.log(type, message || "ERROR: ", data);
    } else {
      winstonLogger.log(type, message || "INFO: ", data);
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
        logger.log("warn", message || "ERROR: ", data);
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
        logger.log("info", message || "DEBUG: ", data);
      } else {
        console.info(message || "DEBUG: ", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  static init = (objs) => {
    if (!instance) {
      instance = new LoggingGCP(objs);
    }
    return instance;
  };
}

module.exports = LoggingGCP;
