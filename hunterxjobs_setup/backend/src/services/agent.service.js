const { ProjectManagerAgent } = require('../agents/project_manager');
const { ProgrammerAgent } = require('../agents/programmer');
const { DebuggerAgent } = require('../agents/debugger');
const { LinkedInOptimizerAgent } = require('../agents/linkedin_optimizer');
const { SecurityAgent } = require('../agents/security');

class AgentService {
  constructor() {
    // Initialize agents as null
    this.projectManager = null;
    this.programmer = null;
    this.debugger = null;
    this.linkedinOptimizer = null;
    this.security = null;
  }

  /**
   * Initialize communication channels between agents
   */
  initializeAgentCommunication() {
    // Lazy load agents if not already initialized
    if (!this.projectManager) this.projectManager = new ProjectManagerAgent();
    if (!this.programmer) this.programmer = new ProgrammerAgent();
    if (!this.debugger) this.debugger = new DebuggerAgent();
    if (!this.linkedinOptimizer) this.linkedinOptimizer = new LinkedInOptimizerAgent();
    if (!this.security) this.security = new SecurityAgent();
    
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
    if (!this.projectManager) {
      this.projectManager = new ProjectManagerAgent();
      this.initializeAgentCommunication();
    }
    return this.projectManager;
  }

  /**
   * Get the programmer agent
   */
  getProgrammerAgent() {
    if (!this.programmer) {
      this.programmer = new ProgrammerAgent();
      this.initializeAgentCommunication();
    }
    return this.programmer;
  }

  /**
   * Get the debugger agent
   */
  getDebuggerAgent() {
    if (!this.debugger) {
      this.debugger = new DebuggerAgent();
      this.initializeAgentCommunication();
    }
    return this.debugger;
  }

  /**
   * Get the LinkedIn optimizer agent
   */
  getLinkedInOptimizerAgent() {
    if (!this.linkedinOptimizer) {
      this.linkedinOptimizer = new LinkedInOptimizerAgent();
      this.initializeAgentCommunication();
    }
    return this.linkedinOptimizer;
  }

  /**
   * Get the security agent
   */
  getSecurityAgent() {
    if (!this.security) {
      this.security = new SecurityAgent();
      this.initializeAgentCommunication();
    }
    return this.security;
  }

  /**
   * Analyze LinkedIn profile using the LinkedIn optimizer agent
   * @param {Object} profileData - LinkedIn profile data
   */
  async analyzeProfile(profileData) {
    return await this.getLinkedInOptimizerAgent().analyzeProfile(profileData);
  }

  /**
   * Generate optimization suggestions using the LinkedIn optimizer agent
   * @param {Object} profileData - LinkedIn profile data
   * @param {String} section - Profile section to optimize
   */
  async generateOptimizationSuggestions(profileData, section) {
    return await this.getLinkedInOptimizerAgent().generateOptimizationSuggestions(profileData, section);
  }

  /**
   * Generate content using the LinkedIn optimizer agent
   * @param {Object} params - Content generation parameters
   */
  async generateContent(params) {
    return await this.getLinkedInOptimizerAgent().generateContent(params);
  }

  /**
   * Analyze content virality using the LinkedIn optimizer agent
   * @param {String} content - Content to analyze
   */
  async analyzeContentVirality(content) {
    return await this.getLinkedInOptimizerAgent().analyzeContentVirality(content);
  }

  /**
   * Perform security check using the security agent
   * @param {Object} data - Data to check
   */
  async performSecurityCheck(data) {
    return await this.getSecurityAgent().performSecurityCheck(data);
  }

  /**
   * Debug code using the debugger agent
   * @param {String} code - Code to debug
   */
  async debugCode(code) {
    return await this.getDebuggerAgent().debugCode(code);
  }

  /**
   * Get project status from the project manager agent
   */
  async getProjectStatus() {
    return await this.getProjectManagerAgent().getProjectStatus();
  }
}

// Create a singleton instance
const agentService = new AgentService();

module.exports = agentService;
