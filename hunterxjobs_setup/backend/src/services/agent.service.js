const { ProjectManagerAgent } = require('../agents/project_manager');
const { ProgrammerAgent } = require('../agents/programmer');
const { DebuggerAgent } = require('../agents/debugger');
const { LinkedInOptimizerAgent } = require('../agents/linkedin_optimizer');
const { SecurityAgent } = require('../agents/security');

class AgentService {
  constructor() {
    this.projectManager = new ProjectManagerAgent();
    this.programmer = new ProgrammerAgent();
    this.debugger = new DebuggerAgent();
    this.linkedinOptimizer = new LinkedInOptimizerAgent();
    this.security = new SecurityAgent();
    
    // Initialize communication between agents
    this.initializeAgentCommunication();
  }

  /**
   * Initialize communication channels between agents
   */
  initializeAgentCommunication() {
    // Set up communication channels between agents
    this.projectManager.registerAgents({
      programmer: this.programmer,
      debugger: this.debugger,
      linkedinOptimizer: this.linkedinOptimizer,
      security: this.security
    });
    
    this.programmer.registerAgents({
      projectManager: this.projectManager,
      debugger: this.debugger,
      security: this.security
    });
    
    this.debugger.registerAgents({
      projectManager: this.projectManager,
      programmer: this.programmer,
      security: this.security
    });
    
    this.linkedinOptimizer.registerAgents({
      projectManager: this.projectManager,
      programmer: this.programmer
    });
    
    this.security.registerAgents({
      projectManager: this.projectManager,
      programmer: this.programmer,
      debugger: this.debugger
    });
  }

  /**
   * Get the project manager agent
   */
  getProjectManagerAgent() {
    return this.projectManager;
  }

  /**
   * Get the programmer agent
   */
  getProgrammerAgent() {
    return this.programmer;
  }

  /**
   * Get the debugger agent
   */
  getDebuggerAgent() {
    return this.debugger;
  }

  /**
   * Get the LinkedIn optimizer agent
   */
  getLinkedInOptimizerAgent() {
    return this.linkedinOptimizer;
  }

  /**
   * Get the security agent
   */
  getSecurityAgent() {
    return this.security;
  }

  /**
   * Analyze LinkedIn profile using the LinkedIn optimizer agent
   * @param {Object} profileData - LinkedIn profile data
   */
  async analyzeProfile(profileData) {
    return await this.linkedinOptimizer.analyzeProfile(profileData);
  }

  /**
   * Generate optimization suggestions using the LinkedIn optimizer agent
   * @param {Object} profileData - LinkedIn profile data
   * @param {String} section - Profile section to optimize
   */
  async generateOptimizationSuggestions(profileData, section) {
    return await this.linkedinOptimizer.generateOptimizationSuggestions(profileData, section);
  }

  /**
   * Generate content using the LinkedIn optimizer agent
   * @param {Object} params - Content generation parameters
   */
  async generateContent(params) {
    return await this.linkedinOptimizer.generateContent(params);
  }

  /**
   * Analyze content virality using the LinkedIn optimizer agent
   * @param {String} content - Content to analyze
   */
  async analyzeContentVirality(content) {
    return await this.linkedinOptimizer.analyzeContentVirality(content);
  }

  /**
   * Perform security check using the security agent
   * @param {Object} data - Data to check
   */
  async performSecurityCheck(data) {
    return await this.security.performSecurityCheck(data);
  }

  /**
   * Debug code using the debugger agent
   * @param {String} code - Code to debug
   */
  async debugCode(code) {
    return await this.debugger.debugCode(code);
  }

  /**
   * Get project status from the project manager agent
   */
  async getProjectStatus() {
    return await this.projectManager.getProjectStatus();
  }
}

// Create a singleton instance
const agentService = new AgentService();

module.exports = agentService;
