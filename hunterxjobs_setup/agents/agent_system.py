# Main Agent Integration Module
# This file integrates all agents and provides a unified interface

import logging
import os
import json
from typing import Dict, List, Any, Optional
from datetime import datetime

# Import all agent classes
from agents.base.agent_factory import AgentFactory
from agents.project_manager import ProjectManagerAgent
from agents.programmer import ProgrammerAgent
from agents.debugger import DebuggerAgent
from agents.linkedin_optimizer import LinkedInProfileOptimizerAgent
from agents.security import SecurityAgent

class AgentSystem:
    """
    Main agent system that integrates all agents and manages their interactions.
    """
    
    def __init__(self, config_path: Optional[str] = None):
        """
        Initialize the agent system.
        
        Args:
            config_path: Optional path to configuration file
        """
        # Set up logging
        self.logger = logging.getLogger("AgentSystem")
        self.logger.setLevel(logging.INFO)
        
        # Create console handler if not already exists
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
        
        self.logger.info("Initializing HunterXJobs Agent System")
        
        # Load configuration
        self.config = self._load_config(config_path)
        
        # Initialize agent factory
        self.agent_factory = AgentFactory()
        
        # Initialize agents
        self.agents = {}
        self._initialize_agents()
        
        # Message queue for inter-agent communication
        self.message_queue = []
        
        self.logger.info("HunterXJobs Agent System initialized successfully")
    
    def _load_config(self, config_path: Optional[str]) -> Dict[str, Any]:
        """
        Load configuration from file or use default.
        
        Args:
            config_path: Path to configuration file
            
        Returns:
            Configuration dictionary
        """
        default_config = {
            "agents": {
                "project_manager": {
                    "name": "ProjectManager",
                    "enabled": True
                },
                "programmer": {
                    "name": "Programmer",
                    "enabled": True
                },
                "debugger": {
                    "name": "Debugger",
                    "enabled": True
                },
                "linkedin_optimizer": {
                    "name": "LinkedInOptimizer",
                    "enabled": True
                },
                "security": {
                    "name": "Security",
                    "enabled": True
                }
            },
            "logging": {
                "level": "INFO",
                "file": "agent_system.log"
            },
            "system": {
                "message_processing_interval": 1.0,
                "max_queue_size": 1000
            }
        }
        
        if config_path and os.path.exists(config_path):
            try:
                with open(config_path, 'r') as f:
                    config = json.load(f)
                    # Merge with default config to ensure all required fields exist
                    self._merge_configs(default_config, config)
                    self.logger.info(f"Configuration loaded from {config_path}")
                    return default_config
            except Exception as e:
                self.logger.error(f"Error loading configuration from {config_path}: {str(e)}")
                self.logger.info("Using default configuration")
                return default_config
        else:
            self.logger.info("Using default configuration")
            return default_config
    
    def _merge_configs(self, target: Dict[str, Any], source: Dict[str, Any]) -> None:
        """
        Recursively merge source config into target config.
        
        Args:
            target: Target configuration dictionary
            source: Source configuration dictionary
        """
        for key, value in source.items():
            if key in target and isinstance(target[key], dict) and isinstance(value, dict):
                self._merge_configs(target[key], value)
            else:
                target[key] = value
    
    def _initialize_agents(self) -> None:
        """
        Initialize all agents based on configuration.
        """
        self.logger.info("Initializing agents")
        
        # Initialize Project Manager Agent
        if self.config["agents"]["project_manager"]["enabled"]:
            name = self.config["agents"]["project_manager"]["name"]
            self.agents["project_manager"] = ProjectManagerAgent(name=name)
            self.logger.info(f"Project Manager Agent '{name}' initialized")
        
        # Initialize Programmer Agent
        if self.config["agents"]["programmer"]["enabled"]:
            name = self.config["agents"]["programmer"]["name"]
            self.agents["programmer"] = ProgrammerAgent(name=name)
            self.logger.info(f"Programmer Agent '{name}' initialized")
        
        # Initialize Debugger Agent
        if self.config["agents"]["debugger"]["enabled"]:
            name = self.config["agents"]["debugger"]["name"]
            self.agents["debugger"] = DebuggerAgent(name=name)
            self.logger.info(f"Debugger Agent '{name}' initialized")
        
        # Initialize LinkedIn Profile Optimizer Agent
        if self.config["agents"]["linkedin_optimizer"]["enabled"]:
            name = self.config["agents"]["linkedin_optimizer"]["name"]
            self.agents["linkedin_optimizer"] = LinkedInProfileOptimizerAgent(name=name)
            self.logger.info(f"LinkedIn Profile Optimizer Agent '{name}' initialized")
        
        # Initialize Security Agent
        if self.config["agents"]["security"]["enabled"]:
            name = self.config["agents"]["security"]["name"]
            self.agents["security"] = SecurityAgent(name=name)
            self.logger.info(f"Security Agent '{name}' initialized")
            
            # Start security monitoring
            if self.agents["security"]:
                self.agents["security"].start_security_monitoring()
                self.logger.info("Security monitoring started")
    
    def start(self) -> None:
        """
        Start the agent system.
        """
        self.logger.info("Starting HunterXJobs Agent System")
        
        # Initialize communication between agents
        self._setup_agent_communication()
        
        # Send startup message to Project Manager
        if "project_manager" in self.agents:
            startup_message = {
                "id": self._generate_message_id(),
                "sender": "system",
                "receiver": "project_manager",
                "message_type": "command",
                "content": {
                    "action": "start_project",
                    "data": {
                        "project_name": "HunterXJobs",
                        "started_at": datetime.now().isoformat()
                    }
                },
                "timestamp": datetime.now().isoformat()
            }
            
            self.send_message(startup_message)
            self.logger.info("Startup message sent to Project Manager")
        
        self.logger.info("HunterXJobs Agent System started successfully")
    
    def stop(self) -> None:
        """
        Stop the agent system.
        """
        self.logger.info("Stopping HunterXJobs Agent System")
        
        # Stop security monitoring
        if "security" in self.agents:
            self.agents["security"].stop_security_monitoring()
            self.logger.info("Security monitoring stopped")
        
        # Send shutdown message to all agents
        for agent_id, agent in self.agents.items():
            shutdown_message = {
                "id": self._generate_message_id(),
                "sender": "system",
                "receiver": agent_id,
                "message_type": "command",
                "content": {
                    "action": "shutdown",
                    "data": {
                        "reason": "System shutdown",
                        "shutdown_at": datetime.now().isoformat()
                    }
                },
                "timestamp": datetime.now().isoformat()
            }
            
            self.send_message(shutdown_message)
        
        self.logger.info("Shutdown messages sent to all agents")
        self.logger.info("HunterXJobs Agent System stopped successfully")
    
    def _setup_agent_communication(self) -> None:
        """
        Set up communication channels between agents.
        """
        self.logger.info("Setting up agent communication channels")
        
        # Define agent relationships and communication paths
        
        # Project Manager coordinates with all other agents
        if "project_manager" in self.agents:
            pm_agent = self.agents["project_manager"]
            
            # Project Manager -> Programmer
            if "programmer" in self.agents:
                self._send_introduction_message("project_manager", "programmer")
            
            # Project Manager -> Debugger
            if "debugger" in self.agents:
                self._send_introduction_message("project_manager", "debugger")
            
            # Project Manager -> LinkedIn Optimizer
            if "linkedin_optimizer" in self.agents:
                self._send_introduction_message("project_manager", "linkedin_optimizer")
            
            # Project Manager -> Security
            if "security" in self.agents:
                self._send_introduction_message("project_manager", "security")
        
        # Programmer works with Debugger
        if "programmer" in self.agents and "debugger" in self.agents:
            self._send_introduction_message("programmer", "debugger")
        
        # Programmer works with Security
        if "programmer" in self.agents and "security" in self.agents:
            self._send_introduction_message("programmer", "security")
        
        # Debugger works with Security
        if "debugger" in self.agents and "security" in self.agents:
            self._send_introduction_message("debugger", "security")
        
        self.logger.info("Agent communication channels established")
    
    def _send_introduction_message(self, sender_id: str, receiver_id: str) -> None:
        """
        Send an introduction message between two agents.
        
        Args:
            sender_id: ID of the sending agent
            receiver_id: ID of the receiving agent
        """
        intro_message = {
            "id": self._generate_message_id(),
            "sender": sender_id,
            "receiver": receiver_id,
            "message_type": "introduction",
            "content": {
                "action": "introduce",
                "data": {
                    "agent_type": self.agents[sender_id].agent_type,
                    "capabilities": self._get_agent_capabilities(sender_id)
                }
            },
            "timestamp": datetime.now().isoformat()
        }
        
        self.send_message(intro_message)
        self.logger.debug(f"Introduction message sent from {sender_id} to {receiver_id}")
    
    def _get_agent_capabilities(self, agent_id: str) -> List[str]:
        """
        Get the capabilities of an agent.
        
        Args:
            agent_id: ID of the agent
            
        Returns:
            List of agent capabilities
        """
        # Define capabilities based on agent type
        agent = self.agents.get(agent_id)
        if not agent:
            return []
        
        agent_type = agent.agent_type
        
        if agent_type == "project_manager":
            return [
                "project_planning",
                "task_assignment",
                "progress_tracking",
                "resource_management",
                "risk_management"
            ]
        elif agent_type == "programmer":
            return [
                "code_development",
                "feature_implementation",
                "api_integration",
                "database_management",
                "frontend_development",
                "backend_development"
            ]
        elif agent_type == "debugger":
            return [
                "code_review",
                "bug_identification",
                "performance_optimization",
                "security_review",
                "code_quality_assessment"
            ]
        elif agent_type == "linkedin_optimizer":
            return [
                "profile_analysis",
                "profile_optimization",
                "content_generation",
                "keyword_optimization",
                "engagement_strategy"
            ]
        elif agent_type == "security":
            return [
                "security_monitoring",
                "vulnerability_scanning",
                "threat_detection",
                "ip_blocking",
                "security_reporting"
            ]
        else:
            return []
    
    def send_message(self, message: Dict[str, Any]) -> bool:
        """
        Send a message to the message queue.
        
        Args:
            message: Message to send
            
        Returns:
            True if message was sent successfully, False otherwise
        """
        try:
            # Validate message
            if not self._validate_message(message):
                self.logger.error(f"Invalid message format: {message}")
                return False
            
            # Add to message queue
            self.message_queue.append(message)
            
            # Process message
            self._process_message(message)
            
            return True
        except Exception as e:
            self.logger.error(f"Error sending message: {str(e)}")
            return False
    
    def _validate_message(self, message: Dict[str, Any]) -> bool:
        """
        Validate message format.
        
        Args:
            message: Message to validate
            
        Returns:
            True if message is valid, False otherwise
        """
        required_fields = ["id", "sender", "receiver", "message_type", "content"]
        
        # Check required fields
        for field in required_fields:
            if field not in message:
                self.logger.error(f"Missing required field in message: {field}")
                return False
        
        # Check receiver exists
        receiver = message["receiver"]
        if receiver != "system" and receiver not in self.agents:
            self.logger.error(f"Unknown receiver in message: {receiver}")
            return False
        
        return True
    
    def _process_message(self, message: Dict[str, Any]) -> None:
        """
        Process a message by delivering it to the appropriate agent.
        
        Args:
            message: Message to process
        """
        receiver = message["receiver"]
        
        # Handle system messages
        if receiver == "system":
            self._handle_system_message(message)
            return
        
        # Deliver to agent
        if receiver in self.agents:
            try:
                # Log message delivery
                self.logger.debug(f"Delivering message {message['id']} from {message['sender']} to {receiver}")
                
                # Deliver message to agent
                response = self.agents[receiver].receive_message(message)
                
                # Handle response if needed
                if response:
               <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>