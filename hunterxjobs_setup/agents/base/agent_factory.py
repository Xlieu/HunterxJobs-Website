# Agent Factory Module
# This file defines the factory for creating different types of agents

from typing import Dict, Any, Optional
import importlib
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger("agent_factory")

class AgentFactory:
    """
    Factory class for creating different types of agents.
    Uses dynamic imports to load agent classes based on their type.
    """
    
    def __init__(self):
        """Initialize the agent factory."""
        self.registered_agent_types = {}
        self.logger = logger
    
    def register_agent_type(self, agent_type: str, agent_class_path: str) -> bool:
        """
        Register a new agent type with the factory.
        
        Args:
            agent_type: Type identifier for the agent
            agent_class_path: Import path to the agent class
            
        Returns:
            Boolean indicating success
        """
        if agent_type in self.registered_agent_types:
            self.logger.warning(f"Agent type {agent_type} already registered")
            return False
        
        self.registered_agent_types[agent_type] = agent_class_path
        self.logger.info(f"Registered agent type: {agent_type} -> {agent_class_path}")
        return True
    
    def create_agent(self, agent_type: str, name: str, config: Optional[Dict[str, Any]] = None) -> Any:
        """
        Create a new agent of the specified type.
        
        Args:
            agent_type: Type of agent to create
            name: Name for the new agent
            config: Optional configuration dictionary
            
        Returns:
            Instantiated agent object
        """
        if agent_type not in self.registered_agent_types:
            self.logger.error(f"Unknown agent type: {agent_type}")
            raise ValueError(f"Unknown agent type: {agent_type}")
        
        try:
            # Parse the class path
            module_path, class_name = self.registered_agent_types[agent_type].rsplit('.', 1)
            
            # Dynamically import the module
            module = importlib.import_module(module_path)
            
            # Get the agent class
            agent_class = getattr(module, class_name)
            
            # Create the agent instance
            if config:
                agent = agent_class(name=name, **config)
            else:
                agent = agent_class(name=name)
            
            self.logger.info(f"Created agent: {name} of type {agent_type}")
            return agent
            
        except (ImportError, AttributeError) as e:
            self.logger.error(f"Error creating agent of type {agent_type}: {str(e)}")
            raise ImportError(f"Could not import agent class: {str(e)}")
        except Exception as e:
            self.logger.error(f"Error instantiating agent: {str(e)}")
            raise RuntimeError(f"Error creating agent: {str(e)}")
    
    def get_registered_types(self) -> Dict[str, str]:
        """
        Get all registered agent types.
        
        Returns:
            Dictionary of agent types and their class paths
        """
        return self.registered_agent_types.copy()
