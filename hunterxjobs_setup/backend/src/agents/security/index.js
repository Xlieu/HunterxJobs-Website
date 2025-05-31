const BaseAgent = require('../base/base_agent');

/**
 * Security Agent
 * Responsible for implementing security features and protecting against attacks
 */
class SecurityAgent extends BaseAgent {
  constructor() {
    super('security');
    this.capabilities = [
      'security_check',
      'vulnerability_detection',
      'encryption',
      'authentication_verification',
      'attack_prevention'
    ];
  }

  /**
   * Register other agents for communication
   * @param {Object} agents - Other agents to communicate with
   */
  registerAgents(agents) {
    this.projectManager = agents.projectManager;
    this.programmer = agents.programmer;
    this.debugger = agents.debugger;
  }

  /**
   * Perform security check on data
   * @param {Object} data - Data to check
   * @returns {Object} Security check results
   */
  async performSecurityCheck(data) {
    this.log('Performing security check');
    
    // Determine what type of data we're checking
    let checkResults = {};
    
    if (data.operation) {
      // Operation security check
      checkResults = this.checkOperationSecurity(data.operation);
    } else if (data.content) {
      // Content security check
      checkResults = this.checkContentSecurity(data.content, data.hashtags);
    } else if (data.code) {
      // Code security check
      checkResults = this.checkCodeSecurity(data.code, data.issues);
    } else if (data.feature) {
      // Feature security check
      checkResults = this.checkFeatureSecurity(data.feature, data.requirements);
    } else {
      // Generic security check
      checkResults = {
        passed: true,
        warnings: [],
        message: 'Generic security check passed'
      };
    }
    
    return checkResults;
  }

  /**
   * Check operation security
   * @param {String} operation - Operation to check
   * @returns {Object} Security check results
   * @private
   */
  checkOperationSecurity(operation) {
    this.log(`Checking security for operation: ${operation}`);
    
    // In a real implementation, this would check if the operation
    // is allowed based on user permissions and security policies
    
    const sensitiveOperations = [
      'delete_user',
      'modify_permissions',
      'access_admin_panel',
      'export_user_data'
    ];
    
    const warnings = [];
    
    if (sensitiveOperations.includes(operation)) {
      warnings.push({
        level: 'high',
        message: `Operation "${operation}" requires additional verification`
      });
    }
    
    if (operation.includes('linkedin') && !operation.includes('fetch')) {
      warnings.push({
        level: 'medium',
        message: 'LinkedIn API write operations should be rate-limited'
      });
    }
    
    return {
      passed: true, // Allow the operation but with warnings
      warnings,
      message: warnings.length > 0
        ? 'Operation allowed with security warnings'
        : 'Operation security check passed'
    };
  }

  /**
   * Check content security
   * @param {String} content - Content to check
   * @param {Array} hashtags - Hashtags to check
   * @returns {Object} Security check results
   * @private
   */
  checkContentSecurity(content, hashtags = []) {
    this.log('Checking content security');
    
    // In a real implementation, this would check the content for
    // malicious code, inappropriate content, etc.
    
    const warnings = [];
    
    // Check for potential XSS attacks
    if (content.includes('<script>') || content.includes('javascript:')) {
      warnings.push({
        level: 'high',
        message: 'Potential XSS attack detected in content'
      });
    }
    
    // Check for SQL injection attempts
    if (content.includes('SELECT ') && content.includes('FROM ')) {
      warnings.push({
        level: 'high',
        message: 'Potential SQL injection detected in content'
      });
    }
    
    // Check for inappropriate content
    const inappropriateTerms = ['hack', 'crack', 'exploit', 'vulnerability'];
    for (const term of inappropriateTerms) {
      if (content.toLowerCase().includes(term)) {
        warnings.push({
          level: 'medium',
          message: `Content contains potentially inappropriate term: "${term}"`
        });
      }
    }
    
    // Check hashtags
    if (hashtags && hashtags.length > 0) {
      for (const hashtag of hashtags) {
        if (inappropriateTerms.some(term => hashtag.toLowerCase().includes(term))) {
          warnings.push({
            level: 'medium',
            message: `Hashtag contains potentially inappropriate term: "${hashtag}"`
          });
        }
      }
    }
    
    const highLevelWarnings = warnings.filter(w => w.level === 'high');
    
    return {
      passed: highLevelWarnings.length === 0,
      warnings,
      message: highLevelWarnings.length > 0
        ? 'Content failed security check'
        : warnings.length > 0
          ? 'Content passed security check with warnings'
          : 'Content security check passed'
    };
  }

  /**
   * Check code security
   * @param {String} code - Code to check
   * @param {Array} issues - Known issues in the code
   * @returns {Object} Security check results
   * @private
   */
  checkCodeSecurity(code, issues = []) {
    this.log('Checking code security');
    
    // In a real implementation, this would perform a comprehensive
    // security analysis of the code
    
    const securityIssues = [];
    
    // Check for hardcoded credentials
    if (code.match(/password\s*=\s*['"][^'"]+['"]/)) {
      securityIssues.push({
        level: 'high',
        type: 'hardcoded_credentials',
        message: 'Hardcoded credentials detected in code',
        location: this.findLocation(code, /password\s*=\s*['"][^'"]+['"]/)
      });
    }
    
    // Check for SQL injection vulnerabilities
    if (code.includes('executeQuery') && code.includes('${')) {
      securityIssues.push({
        level: 'high',
        type: 'sql_injection',
        message: 'Potential SQL injection vulnerability: use parameterized queries',
        location: this.findLocation(code, /executeQuery\([^)]*\$\{[^}]*\}[^)]*\)/)
      });
    }
    
    // Check for XSS vulnerabilities
    if (code.includes('innerHTML') || code.includes('dangerouslySetInnerHTML')) {
      securityIssues.push({
        level: 'high',
        type: 'xss',
        message: 'Potential XSS vulnerability: use safe alternatives to innerHTML',
        location: this.findLocation(code, /innerHTML|dangerouslySetInnerHTML/)
      });
    }
    
    // Check for insecure direct object references
    if (code.match(/params\.id|req\.params\.id/) && !code.includes('authorization')) {
      securityIssues.push({
        level: 'medium',
        type: 'idor',
        message: 'Potential insecure direct object reference: add authorization check',
        location: this.findLocation(code, /params\.id|req\.params\.id/)
      });
    }
    
    // Check for missing input validation
    if (code.includes('req.body') && !code.includes('validate')) {
      securityIssues.push({
        level: 'medium',
        type: 'input_validation',
        message: 'Missing input validation for request body',
        location: this.findLocation(code, /req\.body/)
      });
    }
    
    // Check for insecure cryptographic algorithms
    if (code.includes('MD5') || code.includes('SHA1')) {
      securityIssues.push({
        level: 'medium',
        type: 'weak_crypto',
        message: 'Insecure cryptographic algorithm detected: use SHA-256 or stronger',
        location: this.findLocation(code, /MD5|SHA1/)
      });
    }
    
    // Combine with known issues
    const knownSecurityIssues = issues.filter(issue => issue.type === 'security');
    const allSecurityIssues = [...securityIssues, ...knownSecurityIssues];
    
    // Generate recommendations
    const recommendations = this.generateSecurityRecommendations(allSecurityIssues);
    
    const highLevelIssues = allSecurityIssues.filter(issue => issue.level === 'high');
    
    return {
      passed: highLevelIssues.length === 0,
      issues: allSecurityIssues,
      recommendations,
      message: highLevelIssues.length > 0
        ? 'Code failed security check: high-level security issues detected'
        : allSecurityIssues.length > 0
          ? 'Code passed security check with warnings'
          : 'Code security check passed'
    };
  }

  /**
   * Find location of a pattern in code
   * @param {String} code - Code to search
   * @param {RegExp|String} pattern - Pattern to find
   * @returns {Object} Location information
   * @private
   */
  findLocation(code, pattern) {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    const match = code.match(regex);
    
    if (!match) {
      return { line: -1, column: -1 };
    }
    
    const lines = code.substring(0, match.index).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    return { line, column };
  }

  /**
   * Generate security recommendations
   * @param {Array} issues - Security issues
   * @returns {Array} Recommendations
   * @private
   */
  generateSecurityRecommendations(issues) {
    const recommendations = [];
    
    // Group issues by type
    const issuesByType = {};
    for (const issue of issues) {
      if (!issuesByType[issue.type]) {
        issuesByType[issue.type] = [];
      }
      issuesByType[issue.type].push(issue);
    }
    
    // Generate recommendations based on issue types
    if (issuesByType.hardcoded_credentials) {
      recommendations.push({
        priority: 'high',
        description: 'Remove hardcoded credentials',
        details: 'Store sensitive information in environment variables or a secure vault.'
      });
    }
    
    if (issuesByType.sql_injection) {
      recommendations.push({
        priority: 'high',
        description: 'Use parameterized queries',
        details: 'Replace string concatenation with parameterized queries to prevent SQL injection.'
      });
    }
    
    if (issuesByType.xss) {
      recommendations.push({
        priority: 'high',
        description: 'Prevent XSS vulnerabilities',
        details: 'Use textContent instead of innerHTML, or React\'s built-in XSS protection.'
      });
    }
    
    if (issuesByType.idor) {
      recommendations.push({
        priority: 'medium',
        description: 'Implement proper authorization',
        details: 'Add authorization checks to ensure users can only access their own resources.'
      });
    }
    
    if (issuesByType.input_validation) {
      recommendations.push({
        priority: 'medium',
        description: 'Add input validation',
        details: 'Validate all user input using a validation library like express-validator.'
      });
    }
    
    if (issuesByType.weak_crypto) {
      recommendations.push({
        priority: 'medium',
        description: 'Use secure cryptographic algorithms',
        details: 'Replace MD5/SHA1 with SHA-256 or stronger algorithms.'
      });
    }
    
    // Add general security recommendations if no specific issues found
    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'medium',
        description: 'Implement security headers',
        details: 'Add security headers like Content-Security-Policy and X-XSS-Protection.'
      });
      
      recommendations.push({
        priority: 'medium',
        description: 'Enable HTTPS',
        details: 'Ensure all communication is encrypted using HTTPS.'
      });
      
      recommendations.push({
        priority: 'medium',
        description: 'Implement rate limiting',
        details: 'Add rate limiting to prevent brute force and DoS attacks.'
      });
    }
    
    return recommendations;
  }

  /**
   * Check feature security
   * @param {String} feature - Feature to check
   * @param {Object} requirements - Feature requirements
   * @returns {Object} Security check results
   * @private
   */
  checkFeatureSecurity(feature, requirements) {
    this.log(`Checking security for feature: ${feature}`);
    
    // In a real implementation, this would analyze the feature requirements
    // for potential security issues
    
    const securityConsiderations = [];
    
    // Check for features that require special security considerations
    if (feature.includes('auth') || feature.includes('login')) {
      securityConsiderations.push({
        level: 'high',
        description: 'Authentication feature requires secure implementation',
        recommendations: [
          'Use secure password hashing (bcrypt)',
          'Implement account lockout after failed attempts',
          'Use JWT with short expiration and rotation',
          'Implement CSRF protection'
        ]
      });
    }
    
    if (feature.includes('payment') || feature.includes('billing')) {
      securityConsiderations.push({
        level: 'high',
        description: 'Payment feature requires PCI DSS compliance',
        recommendations: [
          'Use a trusted payment processor',
          'Never store full credit card details',
          'Implement strong encryption for sensitive data',
          'Regular security audits'
        ]
      });
    }
    
    if (feature.includes('profile') || feature.includes('user')) {
      securityConsiderations.push({
        level: 'medium',
        description: 'User profile feature requires privacy considerations',
        recommendations: [
          'Implement proper authorization checks',
          'Sanitize user input to prevent XSS',
          'Limit exposed personal information',
          'Provide privacy controls for users'
        ]
      });
    }
    
    if (feature.includes('api') || feature.includes('integration')) {
      securityConsiderations.push({
        level: 'medium',
        description: 'API feature requires secure implementation',
        recommendations: [
          'Implement API authentication',
          'Use rate limiting to prevent abuse',
          'Validate all input parameters',
          'Implement proper error handling'
        ]
      });
    }
    
    if (feature.includes('file') || feature.includes('upload')) {
      securityConsiderations.push({
        level: 'high',
        description: 'File upload feature requires careful security implementation',
        recommendations: [
          'Validate file types and content',
          'Scan uploads for malware',
          'Store files outside web root',
          'Generate random filenames'
        ]
      });
    }
    
    return {
      passed: true, // Allow the feature but with security considerations
      securityConsiderations,
      message: securityConsiderations.length > 0
        ? 'Feature approved with security considerations'
        : 'Feature security check passed'
    };
  }

  /**
   * Encrypt sensitive data
   * @param {String} data - Data to encrypt
   * @param {Object} options - Encryption options
   * @returns {Object} Encrypted data
   */
  async encryptData(data, options = {}) {
    this.log('Encrypting data');
    
    // In a real implementation, this would use a cryptography library
    // to encrypt the data
    
    const { algorithm = 'AES-256-GCM' } = options;
    
    // Mock encryption (for demonstration purposes only)
    const encryptedData = Buffer.from(data).toString('base64');
    
    return {
      algorithm,
      encryptedData,
      iv: 'mock_initialization_vector',
      tag: 'mock_authentication_tag',
      timestamp: new Date()
    };
  }

  /**
   * Decrypt encrypted data
   * @param {Object} encryptedPackage - Encrypted data package
   * @returns {String} Decrypted data
   */
  async decryptData(encryptedPackage) {
    this.log('Decrypting data');
    
    // In a real implementation, this would use a cryptography library
    // to decrypt the data
    
    const { encryptedData } = encryptedPackage;
    
    // Mock decryption (for demonstration purposes only)
    const decryptedData = Buffer.from(encryptedData, 'base64').toString();
    
    return decryptedData;
  }

  /**
   * Verify JWT token
   * @param {String} token - JWT token to verify
   * @returns {Object} Verification result
   */
  async verifyToken(token) {
    this.log('Verifying JWT token');
    
    // In a real implementation, this would use a JWT library
    // to verify the token
    
    // Mock token verification (for demonstration purposes only)
    const tokenParts = token.split('.');
    
    if (tokenParts.length !== 3) {
      return {
        valid: false,
        message: 'Invalid token format'
      };
    }
    
    try {
      // Mock payload (for demonstration purposes only)
      const payload = {
        id: 'user_123',
        email: 'user@example.com',
        exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      };
      
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (payload.exp < currentTime) {
        return {
          valid: false,
          message: 'Token has expired'
        };
      }
      
      return {
        valid: true,
        payload,
        message: 'Token is valid'
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Token verification failed'
      };
    }
  }

  /**
   * Generate security report
   * @returns {Object} Security report
   */
  async generateSecurityReport() {
    this.log('Generating security report');
    
    // In a real implementation, this would analyze the system
    // and generate a comprehensive security report
    
    return {
      timestamp: new Date(),
      overallStatus: 'secure',
      vulnerabilities: [
        {
          severity: 'medium',
          type: 'outdated_dependency',
          description: 'Using outdated version of express',
          recommendation: 'Update express to latest version'
        },
        {
          severity: 'low',
          type: 'missing_header',
          description: 'X-Content-Type-Options header not set',
          recommendation: 'Add X-Content-Type-Options: nosniff header'
        }
      ],
      securityChecks: [
        {
          name: 'HTTPS',
          status: 'passed',
          details: 'HTTPS is properly configured'
        },
        {
          name: 'Authentication',
          status: 'passed',
          details: 'Authentication system is secure'
        },
        {
          name: 'Authorization',
          status: 'passed',
          details: 'Authorization checks are in place'
        },
        {
          name: 'Input Validation',
          status: 'warning',
          details: 'Some endpoints lack proper input validation'
        },
        {
          name: 'Dependency Security',
          status: 'warning',
          details: 'Some dependencies are outdated'
        },
        {
          name: 'Security Headers',
          status: 'warning',
          details: 'Some security headers are missing'
        }
      ],
      recommendations: [
        'Update all dependencies to latest versions',
        'Add missing security headers',
        'Implement input validation for all endpoints',
        'Enable rate limiting for authentication endpoints',
        'Conduct regular security audits'
      ]
    };
  }

  /**
   * Log agent activity
   * @private
   */
  log(message) {
    console.log(`[SecurityAgent] ${message}`);
  }
}

module.exports = { SecurityAgent };
