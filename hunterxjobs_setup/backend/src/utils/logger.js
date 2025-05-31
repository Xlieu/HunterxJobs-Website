/**
 * Simple logger utility for HunterxJobs backend
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Set the current log level - can be adjusted in production vs. development
const currentLogLevel = process.env.LOG_LEVEL 
  ? LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] 
  : (process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG);

/**
 * Format the log message with timestamp and level
 * @param {string} level - The log level (ERROR, WARN, INFO, DEBUG)
 * @param {string} message - The log message
 * @param {Object} [data] - Optional data to include in the log
 * @returns {string} - The formatted log message
 */
const formatLogMessage = (level, message, data) => {
  const timestamp = new Date().toISOString();
  let logMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    try {
      if (data instanceof Error) {
        logMessage += `\n${data.stack || data.message}`;
      } else if (typeof data === 'object') {
        logMessage += `\n${JSON.stringify(data, null, 2)}`;
      } else {
        logMessage += ` ${data}`;
      }
    } catch (e) {
      logMessage += ` [Error serializing data: ${e.message}]`;
    }
  }
  
  return logMessage;
};

/**
 * Log an error message
 * @param {string} message - The error message
 * @param {Object} [data] - Optional error object or additional data
 */
exports.error = (message, data) => {
  if (currentLogLevel >= LOG_LEVELS.ERROR) {
    console.error(formatLogMessage('ERROR', message, data));
  }
};

/**
 * Log a warning message
 * @param {string} message - The warning message
 * @param {Object} [data] - Optional additional data
 */
exports.warn = (message, data) => {
  if (currentLogLevel >= LOG_LEVELS.WARN) {
    console.warn(formatLogMessage('WARN', message, data));
  }
};

/**
 * Log an info message
 * @param {string} message - The info message
 * @param {Object} [data] - Optional additional data
 */
exports.info = (message, data) => {
  if (currentLogLevel >= LOG_LEVELS.INFO) {
    console.info(formatLogMessage('INFO', message, data));
  }
};

/**
 * Log a debug message
 * @param {string} message - The debug message
 * @param {Object} [data] - Optional additional data
 */
exports.debug = (message, data) => {
  if (currentLogLevel >= LOG_LEVELS.DEBUG) {
    console.debug(formatLogMessage('DEBUG', message, data));
  }
}; 