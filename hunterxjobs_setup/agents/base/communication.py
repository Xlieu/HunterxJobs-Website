# Agent Communication Module
# This file defines the communication protocol between agents

import json
from typing import Dict, Any, List, Optional
from datetime import datetime

class AgentCommunication:
    """
    Handles communication between agents in the system.
    Implements the standardized message format and routing.
    """
    
    def __init__(self):
        """Initialize the communication module."""
        self.message_queue = []
        self.message_history = []
        self.registered_agents = {}
    
    def register_agent(self, agent_name: str, agent_type: str, callback_function: callable) -> bool:
        """
        Register an agent with the communication system.
        
        Args:
            agent_name: Name of the agent
            agent_type: Type of the agent
            callback_function: Function to call when a message is received
            
        Returns:
            Boolean indicating success
        """
        if agent_name in self.registered_agents:
            return False
        
        self.registered_agents[agent_name] = {
            "type": agent_type,
            "callback": callback_function,
            "registered_at": datetime.now().isoformat()
        }
        
        return True
    
    def send_message(self, message: Dict[str, Any]) -> str:
        """
        Send a message from one agent to another.
        
        Args:
            message: The message to send
            
        Returns:
            Message ID
        """
        # Validate message format
        required_fields = ["sender", "receiver", "message_type", "content"]
        for field in required_fields:
            if field not in message:
                raise ValueError(f"Message missing required field: {field}")
        
        # Add message ID and timestamp if not present
        if "id" not in message:
            message["id"] = f"msg_{len(self.message_history) + 1}_{datetime.now().timestamp()}"
        
        if "timestamp" not in message:
            message["timestamp"] = datetime.now().isoformat()
        
        # Add to queue and history
        self.message_queue.append(message)
        self.message_history.append(message)
        
        # Attempt immediate delivery
        self._process_message_queue()
        
        return message["id"]
    
    def _process_message_queue(self) -> None:
        """Process pending messages in the queue."""
        remaining_messages = []
        
        for message in self.message_queue:
            delivered = self._deliver_message(message)
            if not delivered:
                remaining_messages.append(message)
        
        self.message_queue = remaining_messages
    
    def _deliver_message(self, message: Dict[str, Any]) -> bool:
        """
        Attempt to deliver a message to its recipient.
        
        Args:
            message: The message to deliver
            
        Returns:
            Boolean indicating if delivery was successful
        """
        receiver = message.get("receiver")
        
        if receiver not in self.registered_agents:
            return False
        
        try:
            callback = self.registered_agents[receiver]["callback"]
            callback(message)
            return True
        except Exception as e:
            print(f"Error delivering message to {receiver}: {str(e)}")
            return False
    
    def get_messages_for_agent(self, agent_name: str) -> List[Dict[str, Any]]:
        """
        Get all messages for a specific agent.
        
        Args:
            agent_name: Name of the agent
            
        Returns:
            List of messages
        """
        return [
            msg for msg in self.message_history 
            if msg.get("receiver") == agent_name
        ]
    
    def get_conversation(self, agent1: str, agent2: str) -> List[Dict[str, Any]]:
        """
        Get the conversation history between two agents.
        
        Args:
            agent1: First agent name
            agent2: Second agent name
            
        Returns:
            List of messages exchanged between the agents
        """
        return [
            msg for msg in self.message_history 
            if (msg.get("sender") == agent1 and msg.get("receiver") == agent2) or
               (msg.get("sender") == agent2 and msg.get("receiver") == agent1)
        ]
    
    def broadcast_message(self, sender: str, message_type: str, content: Dict[str, Any]) -> List[str]:
        """
        Broadcast a message to all registered agents except the sender.
        
        Args:
            sender: Name of the sending agent
            message_type: Type of message
            content: Message content
            
        Returns:
            List of message IDs
        """
        message_ids = []
        
        for agent_name in self.registered_agents:
            if agent_name != sender:
                message = {
                    "sender": sender,
                    "receiver": agent_name,
                    "message_type": message_type,
                    "content": content
                }
                message_id = self.send_message(message)
                message_ids.append(message_id)
        
        return message_ids
