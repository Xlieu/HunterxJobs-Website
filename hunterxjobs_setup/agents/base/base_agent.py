# Base Agent Class
# This file defines the base agent class that all other agents will inherit from

import json
import logging
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

class BaseAgent:
    """
    Base Agent class that provides common functionality for all agents in the system.
    All specialized agents will inherit from this class.
    """
    
    def __init__(self, name: str, agent_type: str):
        """
        Initialize a new agent with a unique ID, name, and type.
        
        Args:
            name: The name of the agent
            agent_type: The type of agent (e.g., "project_manager", "programmer")
        """
        self.id = str(uuid.uuid4())
        self.name = name
        self.agent_type = agent_type
        self.created_at = datetime.now()
        self.state = "initialized"
        self.knowledge_base = {}
        self.tasks = []
        self.messages = []
        self.logger = logging.getLogger(f"agent.{agent_type}.{name}")
        self.logger.info(f"Agent {name} of type {agent_type} initialized with ID {self.id}")
    
    def send_message(self, receiver: str, message_type: str, content: Dict[str, Any], priority: str = "medium") -> Dict:
        """
        Send a message to another agent.
        
        Args:
            receiver: The name of the receiving agent
            message_type: Type of message (request, response, notification)
            content: Dictionary containing message content
            priority: Priority level (high, medium, low)
            
        Returns:
            Dictionary containing the message details
        """
        message = {
            "id": str(uuid.uuid4()),
            "sender": self.name,
            "receiver": receiver,
            "message_type": message_type,
            "content": {
                "action": content.get("action", ""),
                "data": content.get("data", {}),
                "priority": priority,
                "timestamp": datetime.now().isoformat()
            }
        }
        
        self.messages.append(message)
        self.logger.info(f"Message sent to {receiver}: {message_type}")
        return message
    
    def receive_message(self, message: Dict) -> Dict:
        """
        Process a received message and take appropriate action.
        
        Args:
            message: The message to process
            
        Returns:
            Dictionary containing the response
        """
        if message.get("receiver") != self.name:
            self.logger.warning(f"Received message intended for {message.get('receiver')}")
            return {"error": "Message not intended for this agent"}
        
        self.messages.append(message)
        self.logger.info(f"Message received from {message.get('sender')}: {message.get('message_type')}")
        
        # Process the message based on its type and content
        # This is a basic implementation that should be overridden by specialized agents
        response = {
            "id": str(uuid.uuid4()),
            "sender": self.name,
            "receiver": message.get("sender"),
            "message_type": "response",
            "content": {
                "action": "acknowledge",
                "data": {"original_message_id": message.get("id")},
                "priority": message.get("content", {}).get("priority", "medium"),
                "timestamp": datetime.now().isoformat()
            }
        }
        
        return response
    
    def add_task(self, task_description: str, priority: str = "medium", deadline: Optional[datetime] = None) -> Dict:
        """
        Add a new task for the agent to complete.
        
        Args:
            task_description: Description of the task
            priority: Priority level (high, medium, low)
            deadline: Optional deadline for the task
            
        Returns:
            Dictionary containing the task details
        """
        task = {
            "id": str(uuid.uuid4()),
            "description": task_description,
            "priority": priority,
            "status": "pending",
            "created_at": datetime.now().isoformat(),
            "deadline": deadline.isoformat() if deadline else None
        }
        
        self.tasks.append(task)
        self.logger.info(f"Task added: {task_description}")
        return task
    
    def update_task_status(self, task_id: str, status: str) -> Dict:
        """
        Update the status of a task.
        
        Args:
            task_id: ID of the task to update
            status: New status (pending, in_progress, completed, failed)
            
        Returns:
            Updated task dictionary or error message
        """
        for i, task in enumerate(self.tasks):
            if task["id"] == task_id:
                self.tasks[i]["status"] = status
                self.tasks[i]["updated_at"] = datetime.now().isoformat()
                self.logger.info(f"Task {task_id} updated to status: {status}")
                return self.tasks[i]
        
        self.logger.warning(f"Task {task_id} not found")
        return {"error": "Task not found"}
    
    def get_state(self) -> Dict:
        """
        Get the current state of the agent.
        
        Returns:
            Dictionary containing the agent's state
        """
        return {
            "id": self.id,
            "name": self.name,
            "type": self.agent_type,
            "state": self.state,
            "tasks": len(self.tasks),
            "pending_tasks": sum(1 for task in self.tasks if task["status"] == "pending"),
            "messages": len(self.messages)
        }
    
    def update_knowledge(self, key: str, value: Any) -> None:
        """
        Update the agent's knowledge base.
        
        Args:
            key: Knowledge item key
            value: Knowledge item value
        """
        self.knowledge_base[key] = value
        self.logger.info(f"Knowledge base updated: {key}")
    
    def get_knowledge(self, key: str) -> Any:
        """
        Retrieve an item from the agent's knowledge base.
        
        Args:
            key: Knowledge item key
            
        Returns:
            Knowledge item value or None if not found
        """
        if key in self.knowledge_base:
            return self.knowledge_base[key]
        
        self.logger.warning(f"Knowledge item {key} not found")
        return None
    
    def make_decision(self, options: List[Dict], criteria: Dict) -> Dict:
        """
        Make a decision based on given options and criteria.
        This is a basic implementation that should be overridden by specialized agents.
        
        Args:
            options: List of option dictionaries
            criteria: Dictionary of criteria and their weights
            
        Returns:
            The selected option
        """
        # Simple decision-making logic - can be overridden by specialized agents
        if not options:
            return {}
        
        # Default to first option if no criteria provided
        if not criteria:
            return options[0]
        
        # Basic weighted scoring
        scores = []
        for option in options:
            score = 0
            for criterion, weight in criteria.items():
                if criterion in option:
                    score += option[criterion] * weight
            scores.append(score)
        
        best_option_index = scores.index(max(scores))
        return options[best_option_index]
    
    def __str__(self) -> str:
        """String representation of the agent."""
        return f"{self.name} ({self.agent_type})"
    
    def __repr__(self) -> str:
        """Detailed representation of the agent."""
        return f"Agent(id={self.id}, name={self.name}, type={self.agent_type})"
