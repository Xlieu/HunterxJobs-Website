# Initialize the base agent package
# This file makes the base directory a proper Python package

from .base_agent import BaseAgent
from .communication import AgentCommunication
from .agent_factory import AgentFactory

__all__ = ['BaseAgent', 'AgentCommunication', 'AgentFactory']
