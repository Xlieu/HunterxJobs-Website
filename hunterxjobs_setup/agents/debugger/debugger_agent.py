# Debugger Agent
# This file implements the Debugger agent that reviews code and identifies issues

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import os
import re

# Import base agent class
from ..base.base_agent import BaseAgent

class DebuggerAgent(BaseAgent):
    """
    Debugger Agent that reviews code and identifies issues.
    Responsible for ensuring code quality and fixing bugs.
    """
    
    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None):
        """
        Initialize the Debugger agent.
        
        Args:
            name: Name of the agent
            config: Optional configuration dictionary
        """
        super().__init__(name=name, agent_type="debugger")
        
        # Initialize debugger-specific attributes
        self.current_review = None
        self.completed_reviews = []
        self.fixed_issues = []
        self.code_quality_metrics = {}
        self.linting_rules = {}
        self.security_checks = {}
        
        # Load configuration if provided
        if config:
            self._load_config(config)
        
        self.logger.info(f"Debugger Agent {name} initialized")
    
    def _load_config(self, config: Dict[str, Any]) -> None:
        """
        Load configuration settings.
        
        Args:
            config: Configuration dictionary
        """
        if "linting_rules" in config:
            self.linting_rules = config["linting_rules"]
        
        if "security_checks" in config:
            self.security_checks = config["security_checks"]
    
    def review_code(self, file_path: str, code_content: str = None) -> Dict[str, Any]:
        """
        Review code for issues and quality.
        
        Args:
            file_path: Path to the file to review
            code_content: Optional code content (if not provided, will read from file_path)
            
        Returns:
            Dictionary containing review results
        """
        self.logger.info(f"Reviewing code: {file_path}")
        
        # Set as current review
        self.current_review = {
            "file_path": file_path,
            "started_at": datetime.now().isoformat(),
            "issues": [],
            "status": "in_progress"
        }
        
        try:
            # Get code content if not provided
            if code_content is None:
                if os.path.exists(file_path):
                    with open(file_path, 'r') as f:
                        code_content = f.read()
                else:
                    self.logger.error(f"File not found: {file_path}")
                    self.current_review["status"] = "failed"
                    self.current_review["error"] = "File not found"
                    return self.current_review
            
            # Perform code review
            issues = []
            
            # Check for syntax errors
            syntax_issues = self._check_syntax(file_path, code_content)
            issues.extend(syntax_issues)
            
            # Check for code style issues
            style_issues = self._check_code_style(file_path, code_content)
            issues.extend(style_issues)
            
            # Check for security vulnerabilities
            security_issues = self._check_security(file_path, code_content)
            issues.extend(security_issues)
            
            # Check for performance issues
            performance_issues = self._check_performance(file_path, code_content)
            issues.extend(performance_issues)
            
            # Update current review
            self.current_review["issues"] = issues
            self.current_review["issues_count"] = len(issues)
            self.current_review["status"] = "completed"
            self.current_review["completed_at"] = datetime.now().isoformat()
            
            # Add to completed reviews
            self.completed_reviews.append(self.current_review)
            
            # Calculate code quality metrics
            self._calculate_code_quality_metrics(file_path, code_content, issues)
            
            return self.current_review
            
        except Exception as e:
            self.logger.error(f"Error reviewing code: {str(e)}")
            self.current_review["status"] = "failed"
            self.current_review["error"] = str(e)
            return self.current_review
    
    def _check_syntax(self, file_path: str, code_content: str) -> List[Dict[str, Any]]:
        """
        Check for syntax errors in the code.
        
        Args:
            file_path: Path to the file
            code_content: Code content
            
        Returns:
            List of syntax issues
        """
        issues = []
        
        # Determine file type
        file_extension = os.path.splitext(file_path)[1].lower()
        
        if file_extension in ['.py', '.pyw']:
            # Python syntax check
            try:
                compile(code_content, file_path, 'exec')
            except SyntaxError as e:
                issues.append({
                    "type": "syntax",
                    "severity": "critical",
                    "message": f"Syntax error: {str(e)}",
                    "line": e.lineno,
                    "column": e.offset,
                    "code": e.text.strip() if e.text else ""
                })
        
        elif file_extension in ['.js', '.jsx', '.ts', '.tsx']:
            # JavaScript/TypeScript syntax check (simplified)
            # In a real implementation, we would use a proper parser
            
            # Check for mismatched brackets
            brackets = {'(': ')', '[': ']', '{': '}'}
            stack = []
            
            for i, char in enumerate(code_content):
                if char in brackets.keys():
                    stack.append((char, i))
                elif char in brackets.values():
                    if not stack:
                        line_number = code_content[:i].count('\n') + 1
                        column = i - code_content[:i].rfind('\n')
                        issues.append({
                            "type": "syntax",
                            "severity": "critical",
                            "message": f"Unmatched closing bracket: {char}",
                            "line": line_number,
                            "column": column,
                            "code": code_content.splitlines()[line_number-1] if line_number <= len(code_content.splitlines()) else ""
                        })
                    else:
                        open_bracket, _ = stack.pop()
                        if char != brackets[open_bracket]:
                            line_number = code_content[:i].count('\n') + 1
                            column = i - code_content[:i].rfind('\n')
                            issues.append({
                                "type": "syntax",
                                "severity": "critical",
                                "message": f"Mismatched brackets: {open_bracket} and {char}",
                                "line": line_number,
                                "column": column,
                                "code": code_content.splitlines()[line_number-1] if line_number <= len(code_content.splitlines()) else ""
                            })
            
            # Check for unclosed brackets
            for bracket, pos in stack:
                line_number = code_content[:pos].count('\n') + 1
                column = pos - code_content[:pos].rfind('\n')
                issues.append({
                    "type": "syntax",
                    "severity": "critical",
                    "message": f"Unclosed bracket: {bracket}",
                    "line": line_number,
                    "column": column,
                    "code": code_content.splitlines()[line_number-1] if line_number <= len(code_content.splitlines()) else ""
                })
        
        return issues
    
    def _check_code_style(self, file_path: str, code_content: str) -> List[Dict[str, Any]]:
        """
        Check for code style issues.
        
        Args:
            file_path: Path to the file
            code_content: Code content
            
        Returns:
            List of code style issues
        """
        issues = []
        
        # Determine file type
        file_extension = os.path.splitext(file_path)[1].lower()
        
        # Common style checks for all languages
        
        # Check for long lines
        max_line_length = 100
        for i, line in enumerate(code_content.splitlines()):
            if len(line) > max_line_length:
                issues.append({
                    "type": "style",
                    "severity": "low",
                    "message": f"Line too long ({len(line)} > {max_line_length} characters)",
                    "line": i + 1,
                    "column": 1,
                    "code": line
                })
        
        # Check for trailing whitespace
        for i, line in enumerate(code_content.splitlines()):
            if line.rstrip() != line:
                issues.append({
                    "type": "style",
                    "severity": "low",
                    "message": "Trailing whitespace",
                    "line": i + 1,
                    "column": len(line.rstrip()) + 1,
                    "code": line
                })
        
        # Language-specific style checks
        if file_extension in ['.py', '.pyw']:
            # Python style checks
            
            # Check for missing docstrings
            if not re.search(r'""".*?"""', code_content, re.DOTALL):
                issues.append({
                    "type": "style",
                    "severity": "medium",
                    "message": "Missing module docstring",
                    "line": 1,
                    "column": 1,
                    "code": ""
                })
            
            # Check for unused imports
            import_pattern = r'^import\s+(\w+)|^from\s+(\w+)\s+import\s+(.+)$'
            imports = []
            
            for i, line in enumerate(code_content.splitlines()):
                match = re.match(import_pattern, line)
                if match:
                    if match.group(1):  # import module
                        imports.append(match.group(1))
                    elif match.group(3):  # from module import ...
                        for name in re.split(r',\s*', match.group(3)):
                            if name != '*':
                                imports.append(name.strip())
            
            for imp in imports:
                if imp not in code_content.replace(f"import {imp}", "").replace(f"from {imp} import", ""):
                    issues.append({
                        "type": "style",
                        "severity": "low",
                        "message": f"Unused import: {imp}",
                        "line": next((i + 1 for i, line in enumerate(code_content.splitlines()) if imp in line and ('import' in line or 'from' in line)), 1),
                        "column": 1,
                        "code": next((line for line in code_content.splitlines() if imp in line and ('import' in line or 'from' in line)), "")
                    })
        
        elif file_extension in ['.js', '.jsx', '.ts', '.tsx']:
            # JavaScript/TypeScript style checks
            
            # Check for missing semicolons
            for i, line in enumerate(code_content.splitlines()):
                line = line.strip()
                if line and not line.endswith(';') and not line.endswith('{') and not line.endswith('}') and not line.endswith(',') and not line.startswith('//'):
                    issues.append({
                        "type": "style",
                        "severity": "low",
                        "message": "Missing semicolon",
                        "line": i + 1,
                        "column": len(line) + 1,
                        "code": line
                    })
            
            # Check for console.log statements
            for i, line in enumerate(code_content.splitlines()):
                if 'console.log' in line and not line.strip().startswith('//'):
                    issues.append({
                        "type": "style",
                        "severity": "medium",
                        "message": "Console statement should be removed in production code",
                        "line": i + 1,
                        "column": line.find('console.log') + 1,
                        "code": line
                    })
        
        return issues
    
    def _check_security(self, file_path: str, code_content: str) -> List[Dict[str, Any]]:
        """
        Check for security vulnerabilities.
        
        Args:
            file_path: Path to the file
            code_content: Code content
            
        Returns:
            List of security issues
        """
        issues = []
        
        # Determine file type
        file_extension = os.path.splitext(file_path)[1].lower()
        
        # Common security checks for all languages
        
        # Check for hardcoded credentials
        credential_patterns = [
            (r'password\s*=\s*["\']([^"\']+)["\']', "Hardcoded password"),
            (r'api[_\s]*key\s*=\s*["\']([^"\']+)["\']', "Hardcoded API key"),
            (r'secret\s*=\s*["\']([^"\']+)["\']', "Hardcoded secret"),
            (r'token\s*=\s*["\']([^"\']+)["\']', "Hardcoded token")
        ]
        
        for i, line in enumerate(code_content.splitlines()):
            for pattern, message in credential_patterns:
                match = re.search(pattern, line, re.IGNORECASE)
                if match and not line.strip().startswith(('#', '//', '/*')):
                    issues.append({
                        "type": "security",
                        "severity": "critical",
                        "message": message,
                        "line": i + 1,
                        "column": match.start() + 1,
                        "code": line
                    })
        
        # Language-specific security checks
        if file_extension in ['.py', '.pyw']:
            # Python security checks
            
            # Check for SQL injection vulnerabilities
            sql_patterns = [
                r'execute\s*\(\s*[f"\'](.*?)["\']',
                r'executemany\s*\(\s*[f"\'](.*?)["\']',
                r'cursor\.execute\s*\(\s*[f"\'](.*?)["\']'
            ]
            
            for i, line in enumerate(code_content.splitlines()):
                for pattern in sql_patterns:
                    match = re.search(pattern, line)
                    if match and '{' in match.group(1) and not line.strip().startswith('#'):
                        issues.append({
                            "type": "security",
                            "severity": "critical",
                            "message": "Potential SQL injection vulnerability",
                            "line": i + 1,
                            "column": match.start() + 1,
                            "code": line
                        })
            
            # Check for unsafe deserialization
            if 'pickle.loads' in code_content or 'yaml.load(' in code_content:
                for i, line in enumerate(code_content.splitlines()):
                    if 'pickle.loads' in line and not line.strip().startswith('#'):
                        issues.append({
                            "type": "security",
                            "severity": "high",
                            "message": "Unsafe deserialization with pickle.loads",
                            "line": i + 1,
                            "column": line.find('pickle.loads') + 1,
                     <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>