/**
 * Base Agent class for all agents in the system
 */
class BaseAgent {
  /**
   * Create a new agent
   * @param {String} type - Type of agent
   */
  constructor(type) {
    this.type = type;
    this.capabilities = [];
    this.status = 'idle';
  }

  /**
   * Log agent activity
   * @param {String} message - Message to log
   * @private
   */
  log(message) {
    console.log(`[${this.type.toUpperCase()}] ${message}`);
  }
}

module.exports = BaseAgent;
