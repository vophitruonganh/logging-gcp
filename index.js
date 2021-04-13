const {LoggingWinston} = require("@google-cloud/logging-winston");
const {format, createLogger, transports} = require("winston");
const constants = require("./common/constants");
const jsonStringify = require("fast-safe-stringify");
const RELEASE_MODE = ['PRODUCTION', "production", "staging", "STAGING"];
const DEBUG_MODE = ['debug', "DEBUG", "DEVELOP", "develop"];

let logger;
let instance;

const logGCP = RELEASE_MODE.includes(process.env.NODE_ENV);
const isDebug = DEBUG_MODE.includes(process.env.NODE_ENV);

class LoggingGCP {
  constructor(objs) {
    let keyFilename = (objs && objs.keyFilename) || constants.KEY_FILENAME;
    let logName =
      (objs && objs.logName) ||
      process.env.WINSTON_LOG_NAME ||
      process.env.LOG_NAME ||
      "winston_log";

    const logFormater = {
      transform(info) {
        const { timestamp, label, message } = info;
        const level = info[Symbol.for("level")];
        const args = info[Symbol.for("splat")];
        let strArgs = "";
        if (args) strArgs = args.map(item => jsonStringify(item)).join(" ");

        info[
          Symbol.for("message")
          ] = `${timestamp} [${label}] ${level}: ${message} ${strArgs}`;

        if (info && info.error instanceof Error) {
          info.stackTrace = info.error.stack;
        }

        return info;
      },
    };

    logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.json(),
        format.colorize(),

        logFormater
      ),
      transports: [
        new LoggingWinston({ keyFilename: keyFilename, logName: logName }),
      ],
    });

    process.on("unhandledRejection", (error) => {
      logger.error(error && error.stack);
    });

    process.on("uncaughtException", (error) => {
      logger.error(error && error.stack);
    });
  }

  /**
   *
   * @param message
   * @param data
   */
  info(message, ...data) {
    try {
      message = "[INFO] - " + message;
      logger.info(message || "ERROR: ", data);
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  warning(message, ...data) {
    try {
      message = "[WARNING] - " + message;
      logger.warn(message || "ERROR: ", data);
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  };

  /**
   *
   * @param message
   * @param data
   */
  error(message, ...data) {
    try {
      message =
        "[ERROR] - " + message + (message.stack ? "::" + message.stack : "");

      logger.error(message || "ERROR: ", data);
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  /**
   *
   * @param message
   * @param data
   */
  debug(message, ...data) {
    try {
      if (isDebug) {
        message = "[DEBUG] - " + message;
        if (logGCP) {
          logger.info(message || "DEBUG: ", data);
        } else {
          console.info(message || "DEBUG: ", data);
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error(error)
    }
  }

  static init(objs) {
    if (!instance) {
      instance = new LoggingGCP(objs);
    }
    return instance;
  };
}

module.exports = LoggingGCP;
