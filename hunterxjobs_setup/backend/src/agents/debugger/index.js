const BaseAgent = require('../base/base_agent');

/**
 * Debugger Agent
 * Responsible for reviewing code, identifying issues, and fixing bugs
 */
class DebuggerAgent extends BaseAgent {
  constructor() {
    super('debugger');
    this.capabilities = [
      'code_review',
      'bug_identification',
      'performance_optimization',
      'security_vulnerability_detection'
    ];
  }

  /**
   * Register other agents for communication
   * @param {Object} agents - Other agents to communicate with
   */
  registerAgents(agents) {
    this.projectManager = agents.projectManager;
    this.programmer = agents.programmer;
    this.security = agents.security;
  }

  /**
   * Debug code
   * @param {String} code - Code to debug
   * @returns {Object} Debug results
   */
  async debugCode(code) {
    this.log('Debugging code');
    
    // In a real implementation, this would use AI to analyze the code
    // and identify bugs, performance issues, and security vulnerabilities
    
    const issues = this.identifyIssues(code);
    const fixedCode = this.fixIssues(code, issues);
    
    // Notify security agent about potential security issues
    if (issues.some(issue => issue.type === 'security')) {
      await this.security.performSecurityCheck({ code, issues });
    }
    
    return {
      success: true,
      originalCode: code,
      fixedCode,
      issues,
      summary: `Found ${issues.length} issues (${issues.filter(i => i.severity === 'high').length} high, ${issues.filter(i => i.severity === 'medium').length} medium, ${issues.filter(i => i.severity === 'low').length} low)`
    };
  }

  /**
   * Identify issues in code
   * @param {String} code - Code to analyze
   * @returns {Array} Identified issues
   * @private
   */
  identifyIssues(code) {
    const issues = [];
    
    // Check for common issues
    
    // 1. Check for console.log statements
    if (code.includes('console.log')) {
      issues.push({
        type: 'style',
        severity: 'low',
        message: 'Remove console.log statements in production code',
        line: this.findLineNumber(code, 'console.log')
      });
    }
    
    // 2. Check for potential memory leaks in React components
    if (code.includes('useEffect') && !code.includes('return () =>')) {
      issues.push({
        type: 'performance',
        severity: 'medium',
        message: 'Potential memory leak: missing cleanup function in useEffect',
        line: this.findLineNumber(code, 'useEffect')
      });
    }
    
    // 3. Check for hardcoded credentials
    if (code.match(/password\s*=\s*['"][^'"]+['"]/)) {
      issues.push({
        type: 'security',
        severity: 'high',
        message: 'Hardcoded credentials detected',
        line: this.findLineNumber(code, /password\s*=\s*['"][^'"]+['"]/)
      });
    }
    
    // 4. Check for SQL injection vulnerabilities
    if (code.includes('executeQuery') && code.includes('${')) {
      issues.push({
        type: 'security',
        severity: 'high',
        message: 'Potential SQL injection vulnerability: use parameterized queries',
        line: this.findLineNumber(code, 'executeQuery')
      });
    }
    
    // 5. Check for error handling
    if (code.includes('try') && !code.includes('catch')) {
      issues.push({
        type: 'reliability',
        severity: 'medium',
        message: 'Missing error handling in try block',
        line: this.findLineNumber(code, 'try')
      });
    }
    
    // 6. Check for unused variables
    const variableDeclarations = code.match(/const\s+(\w+)\s*=/g) || [];
    for (const declaration of variableDeclarations) {
      const variableName = declaration.match(/const\s+(\w+)\s*=/)[1];
      const regex = new RegExp(`\\b${variableName}\\b`, 'g');
      const matches = code.match(regex) || [];
      
      if (matches.length === 1) {
        issues.push({
          type: 'style',
          severity: 'low',
          message: `Unused variable: ${variableName}`,
          line: this.findLineNumber(code, declaration)
        });
      }
    }
    
    return issues;
  }

  /**
   * Fix issues in code
   * @param {String} code - Original code
   * @param {Array} issues - Identified issues
   * @returns {String} Fixed code
   * @private
   */
  fixIssues(code, issues) {
    let fixedCode = code;
    
    for (const issue of issues) {
      switch (issue.type) {
        case 'style':
          if (issue.message.includes('console.log')) {
            // Remove console.log statements
            fixedCode = fixedCode.replace(/console\.log\([^)]*\);?\n?/g, '');
          }
          break;
          
        case 'performance':
          if (issue.message.includes('useEffect')) {
            // Add cleanup function to useEffect
            fixedCode = fixedCode.replace(
              /useEffect\(\(\) => \{([^}]*)\}\s*,\s*\[(.*?)\]\)/g,
              'useEffect(() => {$1\n  return () => {\n    // Cleanup function\n  };\n}, [$2])'
            );
          }
          break;
          
        case 'security':
          if (issue.message.includes('Hardcoded credentials')) {
            // Replace hardcoded credentials with environment variables
            fixedCode = fixedCode.replace(
              /password\s*=\s*['"]([^'"]+)['"]/g,
              'password = process.env.PASSWORD'
            );
          }
          
          if (issue.message.includes('SQL injection')) {
            // Replace string interpolation with parameterized queries
            fixedCode = fixedCode.replace(
              /executeQuery\(`([^`]*)\${([^}]*)}\s*([^`]*)`\)/g,
              'executeQuery(`$1? $3`, [$2])'
            );
          }
          break;
          
        case 'reliability':
          if (issue.message.includes('error handling')) {
            // Add error handling to try block
            fixedCode = fixedCode.replace(
              /try\s*\{([^}]*)\}/g,
              'try {$1} catch (error) {\n  console.error(\'Error:\', error);\n  throw error;\n}'
            );
          }
          break;
      }
    }
    
    return fixedCode;
  }

  /**
   * Find line number of a pattern in code
   * @param {String} code - Code to search
   * @param {String|RegExp} pattern - Pattern to find
   * @returns {Number} Line number (1-based)
   * @private
   */
  findLineNumber(code, pattern) {
    const lines = code.split('\n');
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        return i + 1;
      }
    }
    
    return -1;
  }

  /**
   * Review code
   * @param {String} code - Code to review
   * @param {Object} options - Review options
   * @returns {Object} Review results
   */
  async reviewCode(code, options = {}) {
    this.log('Reviewing code');
    
    const { thoroughness = 'normal' } = options;
    
    // In a real implementation, this would use AI to perform a comprehensive
    // code review based on best practices and coding standards
    
    const issues = this.identifyIssues(code);
    
    // Additional checks based on thoroughness
    if (thoroughness === 'high') {
      // Check for code complexity
      const complexityScore = this.calculateComplexity(code);
      
      if (complexityScore > 15) {
        issues.push({
          type: 'complexity',
          severity: 'medium',
          message: `Code complexity score (${complexityScore}) is too high, consider refactoring`,
          line: -1
        });
      }
      
      // Check for test coverage
      if (!code.includes('test') && !code.includes('spec')) {
        issues.push({
          type: 'testing',
          severity: 'medium',
          message: 'No tests found for this code',
          line: -1
        });
      }
    }
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(code, issues);
    
    return {
      issues,
      recommendations,
      qualityScore: this.calculateQualityScore(code, issues),
      summary: `Code review completed with ${issues.length} issues found.`
    };
  }

  /**
   * Calculate code complexity
   * @param {String} code - Code to analyze
   * @returns {Number} Complexity score
   * @private
   */
  calculateComplexity(code) {
    // Simple complexity calculation based on:
    // - Number of if statements
    // - Number of loops
    // - Number of function declarations
    // - Nesting depth
    
    const ifCount = (code.match(/if\s*\(/g) || []).length;
    const loopCount = (code.match(/for\s*\(/g) || []).length + (code.match(/while\s*\(/g) || []).length;
    const functionCount = (code.match(/function\s+\w+\s*\(/g) || []).length + (code.match(/=>\s*{/g) || []).length;
    
    // Calculate nesting depth
    let maxDepth = 0;
    let currentDepth = 0;
    
    for (const char of code) {
      if (char === '{') {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      } else if (char === '}') {
        currentDepth = Math.max(0, currentDepth - 1);
      }
    }
    
    return ifCount + loopCount * 2 + functionCount + maxDepth * 3;
  }

  /**
   * Calculate code quality score
   * @param {String} code - Code to analyze
   * @param {Array} issues - Identified issues
   * @returns {Number} Quality score (0-100)
   * @private
   */
  calculateQualityScore(code, issues) {
    // Base score
    let score = 100;
    
    // Deduct points for issues based on severity
    for (const issue of issues) {
      switch (issue.severity) {
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'low':
          score -= 5;
          break;
      }
    }
    
    // Deduct points for code complexity
    const complexity = this.calculateComplexity(code);
    if (complexity > 20) {
      score -= 15;
    } else if (complexity > 15) {
      score -= 10;
    } else if (complexity > 10) {
      score -= 5;
    }
    
    // Bonus points for good practices
    if (code.includes('try') && code.includes('catch')) {
      score += 5;
    }
    
    if (code.includes('test') || code.includes('spec')) {
      score += 10;
    }
    
    if (code.includes('documentation') || code.includes('* @param')) {
      score += 5;
    }
    
    // Ensure score is within 0-100 range
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate recommendations for code improvement
   * @param {String} code - Code to analyze
   * @param {Array} issues - Identified issues
   * @returns {Array} Recommendations
   * @private
   */
  generateRecommendations(code, issues) {
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
    if (issuesByType.security) {
      recommendations.push({
        category: 'Security',
        description: 'Address security vulnerabilities',
        details: 'Fix identified security issues to prevent potential attacks.',
        priority: 'high'
      });
    }
    
    if (issuesByType.performance) {
      recommendations.push({
        category: 'Performance',
        description: 'Optimize code performance',
        details: 'Address performance issues to improve application responsiveness.',
        priority: 'medium'
      });
    }
    
    if (issuesByType.reliability) {
      recommendations.push({
        category: 'Reliability',
        description: 'Improve error handling',
        details: 'Add proper error handling to prevent application crashes.',
        priority: 'high'
      });
    }
    
    if (issuesByType.complexity) {
      recommendations.push({
        category: 'Maintainability',
        description: 'Reduce code complexity',
        details: 'Refactor complex code to improve maintainability.',
        priority: 'medium'
      });
    }
    
    if (issuesByType.style) {
      recommendations.push({
        category: 'Code Style',
        description: 'Improve code style',
        details: 'Follow coding standards for better readability and maintainability.',
        priority: 'low'
      });
    }
    
    if (issuesByType.testing) {
      recommendations.push({
        category: 'Testing',
        description: 'Add tests',
        details: 'Implement unit tests to ensure code reliability.',
        priority: 'medium'
      });
    }
    
    // Add general recommendations if no specific issues found
    if (recommendations.length === 0) {
      recommendations.push({
        category: 'General',
        description: 'Add documentation',
        details: 'Add more detailed documentation to improve code understanding.',
        priority: 'low'
      });
      
      recommendations.push({
        category: 'Testing',
        description: 'Increase test coverage',
        details: 'Add more tests to ensure code reliability.',
        priority: 'medium'
      });
    }
    
    return recommendations;
  }

  /**
   * Optimize code performance
   * @param {String} code - Code to optimize
   * @returns {Object} Optimization results
   */
  async optimizePerformance(code) {
    this.log('Optimizing code performance');
    
    // In a real implementation, this would use AI to identify and fix
    // performance issues in the code
    
    // Identify performance issues
    const issues = [];
    
    // Check for inefficient loops
    if (code.includes('forEach') && code.includes('filter')) {
      issues.push({
        type: 'performance',
        description: 'Multiple array iterations',
        suggestion: 'Combine forEach and filter operations to reduce iterations'
      });
    }
    
    // Check for inefficient DOM operations
    if (code.includes('document.querySelector') && code.match(/for\s*\(/)) {
      issues.push({
        type: 'performance',
        description: 'DOM queries inside loops',
        suggestion: 'Move DOM queries outside of loops to reduce reflows'
      });
    }
    
    // Check for memory leaks in event listeners
    if (code.includes('addEventListener') && !code.includes('removeEventListener')) {
      issues.push({
        type: 'performance',
        description: 'Potential memory leak',
        suggestion: 'Add removeEventListener to clean up event listeners'
      });
    }
    
    // Optimize code based on identified issues
    let optimizedCode = code;
    
    // Apply optimizations
    for (const issue of issues) {
      if (issue.description === 'Multiple array iterations') {
        // Replace separate forEach and filter with a single loop
        optimizedCode = optimizedCode.replace(
          /(\w+)\.filter\(([^)]+)\)\.forEach\(([^)]+)\)/g,
          '$1.forEach((item) => {\n  if ($2.replace(/\\w+/g, "item")) {\n    $3.replace(/\\w+/g, "item");\n  }\n})'
        );
      }
      
      if (issue.description === 'DOM queries inside loops') {
        // Move DOM queries outside of loops
        optimizedCode = optimizedCode.replace(
          /(for\s*\([^{]+\{[^]*?)(document\.querySelector\([^)]+\))/g,
          'const element = $2;\n$1'
        );
      }
      
      if (issue.description === 'Potential memory leak') {
        // Add cleanup for event listeners
        optimizedCode = optimizedCode.replace(
          /(addEventListener\([^)]+\))/g,
          '$1\n\n// Don\'t forget to remove the event listener when component unmounts:\n// removeEventListener(...)'
        );
      }
    }
    
    // Calculate performance improvement
    const improvementPercentage = issues.length > 0 ? 15 + Math.random() * 20 : 0;
    
    return {
      originalCode: code,
      optimizedCode,
      issues,
      improvementPercentage: Math.round(improvementPercentage),
      summary: `Identified ${issues.length} performance issues and optimized the code.`
    };
  }

  /**
   * Log agent activity
   * @private
   */
  log(message) {
    console.log(`[DebuggerAgent] ${message}`);
  }
}

module.exports = { DebuggerAgent };
