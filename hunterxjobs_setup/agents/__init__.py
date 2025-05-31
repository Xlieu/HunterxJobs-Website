# Main package initialization
# This file makes the agents directory a proper Python package

from .base import BaseAgent, AgentCommunication, AgentFactory

__all__ = ['BaseAgent', 'AgentCommunication', 'AgentFactory']
