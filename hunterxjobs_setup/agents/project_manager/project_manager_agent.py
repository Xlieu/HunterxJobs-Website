# Project Manager Agent
# This file implements the Project Manager agent that coordinates other agents

from typing import Dict, List, Any, Optional
import logging
from datetime import datetime

from ..base.base_agent import BaseAgent

class ProjectManagerAgent(BaseAgent):
    """
    Project Manager Agent that coordinates the activities of other agents.
    Responsible for tracking progress, assigning tasks, and ensuring alignment with project goals.
    """
    
    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None):
        """
        Initialize the Project Manager agent.
        
        Args:
            name: Name of the agent
            config: Optional configuration dictionary
        """
        super().__init__(name=name, agent_type="project_manager")
        
        # Initialize project-specific attributes
        self.project_name = "HunterXJobs"
        self.project_phase = "planning"  # planning, development, testing, deployment
        self.project_status = "active"
        self.project_start_date = datetime.now()
        self.project_deadline = None
        
        # Track managed agents
        self.managed_agents = {}
        
        # Project requirements and features
        self.requirements = {}
        self.features = {}
        self.feature_priorities = {}
        
        # Development timeline
        self.timeline = []
        
        # Load configuration if provided
        if config:
            self._load_config(config)
        
        self.logger.info(f"Project Manager Agent {name} initialized for project {self.project_name}")
    
    def _load_config(self, config: Dict[str, Any]) -> None:
        """
        Load configuration settings.
        
        Args:
            config: Configuration dictionary
        """
        if "project_name" in config:
            self.project_name = config["project_name"]
        
        if "project_deadline" in config:
            self.project_deadline = config["project_deadline"]
        
        if "requirements" in config:
            self.requirements = config["requirements"]
        
        if "features" in config:
            self.features = config["features"]
    
    def register_agent(self, agent_name: str, agent_type: str) -> bool:
        """
        Register an agent to be managed by the Project Manager.
        
        Args:
            agent_name: Name of the agent
            agent_type: Type of the agent
            
        Returns:
            Boolean indicating success
        """
        if agent_name in self.managed_agents:
            self.logger.warning(f"Agent {agent_name} already registered")
            return False
        
        self.managed_agents[agent_name] = {
            "type": agent_type,
            "status": "idle",
            "current_task": None,
            "completed_tasks": [],
            "registered_at": datetime.now().isoformat()
        }
        
        self.logger.info(f"Registered agent: {agent_name} of type {agent_type}")
        return True
    
    def assign_task(self, agent_name: str, task_description: str, priority: str = "medium", 
                   deadline: Optional[datetime] = None, dependencies: List[str] = None) -> Dict:
        """
        Assign a task to a managed agent.
        
        Args:
            agent_name: Name of the agent to assign the task to
            task_description: Description of the task
            priority: Priority level (high, medium, low)
            deadline: Optional deadline for the task
            dependencies: List of task IDs that must be completed before this task
            
        Returns:
            Dictionary containing the task details or error message
        """
        if agent_name not in self.managed_agents:
            self.logger.error(f"Cannot assign task: Agent {agent_name} not registered")
            return {"error": f"Agent {agent_name} not registered"}
        
        task = {
            "id": f"task_{len(self.tasks) + 1}_{datetime.now().timestamp()}",
            "agent": agent_name,
            "description": task_description,
            "priority": priority,
            "status": "assigned",
            "created_at": datetime.now().isoformat(),
            "deadline": deadline.isoformat() if deadline else None,
            "dependencies": dependencies or []
        }
        
        # Add to our task list
        self.tasks.append(task)
        
        # Update agent status
        self.managed_agents[agent_name]["status"] = "assigned"
        self.managed_agents[agent_name]["current_task"] = task["id"]
        
        # Send message to the agent
        self.send_message(
            receiver=agent_name,
            message_type="task_assignment",
            content={
                "action": "assign_task",
                "data": task
            },
            priority=priority
        )
        
        self.logger.info(f"Task {task['id']} assigned to {agent_name}: {task_description}")
        return task
    
    def update_agent_status(self, agent_name: str, status: str, task_id: Optional[str] = None) -> bool:
        """
        Update the status of a managed agent.
        
        Args:
            agent_name: Name of the agent
            status: New status (idle, assigned, working, blocked)
            task_id: Optional task ID related to the status update
            
        Returns:
            Boolean indicating success
        """
        if agent_name not in self.managed_agents:
            self.logger.error(f"Cannot update status: Agent {agent_name} not registered")
            return False
        
        old_status = self.managed_agents[agent_name]["status"]
        self.managed_agents[agent_name]["status"] = status
        
        if task_id:
            # Update task status if provided
            for i, task in enumerate(self.tasks):
                if task["id"] == task_id:
                    if status == "idle" and task["status"] != "completed":
                        self.tasks[i]["status"] = "completed"
                        
                        # Move from current to completed tasks for the agent
                        if self.managed_agents[agent_name]["current_task"] == task_id:
                            self.managed_agents[agent_name]["current_task"] = None
                            self.managed_agents[agent_name]["completed_tasks"].append(task_id)
                    
                    elif status == "blocked":
                        self.tasks[i]["status"] = "blocked"
        
        self.logger.info(f"Agent {agent_name} status updated: {old_status} -> {status}")
        return True
    
    def get_project_status(self) -> Dict[str, Any]:
        """
        Get the current status of the project.
        
        Returns:
            Dictionary containing project status information
        """
        total_tasks = len(self.tasks)
        completed_tasks = sum(1 for task in self.tasks if task["status"] == "completed")
        
        return {
            "project_name": self.project_name,
            "phase": self.project_phase,
            "status": self.project_status,
            "start_date": self.project_start_date.isoformat(),
            "deadline": self.project_deadline.isoformat() if self.project_deadline else None,
            "progress": f"{completed_tasks}/{total_tasks} tasks completed",
            "progress_percentage": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0,
            "agents": len(self.managed_agents),
            "agent_statuses": {name: info["status"] for name, info in self.managed_agents.items()}
        }
    
    def set_feature_priority(self, feature_id: str, priority: int) -> bool:
        """
        Set the priority of a feature.
        
        Args:
            feature_id: ID of the feature
            priority: Priority value (higher number = higher priority)
            
        Returns:
            Boolean indicating success
        """
        if feature_id not in self.features:
            self.logger.error(f"Cannot set priority: Feature {feature_id} not found")
            return False
        
        self.feature_priorities[feature_id] = priority
        self.logger.info(f"Feature {feature_id} priority set to {priority}")
        return True
    
    def get_next_tasks(self, count: int = 1) -> List[Dict]:
        """
        Get the next tasks that should be worked on based on priorities and dependencies.
        
        Args:
            count: Number of tasks to return
            
        Returns:
            List of task dictionaries
        """
        # Filter for pending tasks
        pending_tasks = [task for task in self.tasks if task["status"] == "pending"]
        
        # Check dependencies
        available_tasks = []
        for task in pending_tasks:
            dependencies_met = True
            for dep_id in task.get("dependencies", []):
                # Find the dependency task
                dep_task = next((t for t in self.tasks if t["id"] == dep_id), None)
                if not dep_task or dep_task["status"] != "completed":
                    dependencies_met = False
                    break
            
            if dependencies_met:
                available_tasks.append(task)
        
        # Sort by priority
        priority_map = {"high": 3, "medium": 2, "low": 1}
        sorted_tasks = sorted(
            available_tasks, 
            key=lambda t: priority_map.get(t["priority"], 0), 
            reverse=True
        )
        
        return sorted_tasks[:count]
    
    def update_project_phase(self, phase: str) -> bool:
        """
        Update the current phase of the project.
        
        Args:
            phase: New project phase (planning, development, testing, deployment)
            
        Returns:
            Boolean indicating success
        """
        valid_phases = ["planning", "development", "testing", "deployment"]
        if phase not in valid_phases:
            self.logger.error(f"Invalid project phase: {phase}")
            return False
        
        old_phase = self.project_phase
        self.project_phase = phase
        
        # Notify all managed agents about the phase change
        for agent_name in self.managed_agents:
            self.send_message(
                receiver=agent_name,
                message_type="notification",
                content={
                    "action": "project_phase_changed",
                    "data": {
                        "old_phase": old_phase,
                        "new_phase": phase,
                        "timestamp": datetime.now().isoformat()
                    }
                }
            )
        
        self.logger.info(f"Project phase updated: {old_phase} -> {phase}")
        return True
    
    def receive_message(self, message: Dict) -> Dict:
        """
        Process a received message and take appropriate action.
        Override the base class method to provide specialized behavior.
        
        Args:
            message: The message to process
            
        Returns:
            Dictionary containing the response
        """
        super().receive_message(message)
        
        sender = message.get("sender")
        message_type = message.get("message_type")
        content = message.get("content", {})
        action = content.get("action", "")
        
        response_data = {}
        
        # Handle different message types and actions
        if message_type == "status_update":
            if action == "task_completed":
                task_id = content.get("data", {}).get("task_id")
                if task_id:
                    self.update_agent_status(sender, "idle", task_id)
                    response_data = {"status": "acknowledged"}
            
            elif action == "task_started":
                task_id = content.get("data", {}).get("task_id")
                if task_id:
                    self.update_agent_status(sender, "working", task_id)
                    response_data = {"status": "acknowledged"}
            
            elif action == "task_blocked":
                task_id = content.get("data", {}).get("task_id")
                reason = content.get("data", {}).get("reason")
                if task_id:
                    self.update_agent_status(sender, "blocked", task_id)
                    response_data = {"status": "acknowledged", "next_steps": "Investigating blockers"}
        
        elif message_type == "request":
            if action == "get_next_task":
                next_tasks = self.get_next_tasks(1)
                if next_tasks:
                    task = next_tasks[0]
                    self.assign_task(
                        sender, 
                        task["description"],
                        task["priority"],
                        datetime.fromisoformat(task["deadline"]) if task["deadline"] else None,
                        task["dependencies"]
                    )
                    response_data = {"task_assigned": True, "task": task}
                else:
                    response_data = {"task_assigned": False, "reason": "No available tasks"}
            
            elif action == "get_project_status":
                response_data = self.get_project_status()
        
        # Prepare and send response
        response = {
            "id": f"resp_{message.get('id')}",
            "sender": self.name,
            "receiver": sender,
            "message_type": "response",
            "content": {
                "action": f"{action}_response",
                "data": response_data,
                "priority": content.get("priority", "medium"),
                "timestamp": datetime.now().isoformat()
            }
        }
        
        return response
    
    def generate_project_report(self) -> Dict[str, Any]:
        """
        Generate a comprehensive report on the project status.
        
        Returns:
            Dictionary containing the project report
        """
        # Get basic project status
        report = self.get_project_status()
        
        # Add detailed task information
        task_statuses = {}
        for status in ["pending", "assigned", "in_progress", "completed", "blocked"]:
            task_statuses[status] = sum(1 for task in self.tasks if task["status"] == status)
        
        # Add agent productivity information
        agent_productivity = {}
        for agent_name, info in self.managed_agents.items():
            completed_count = len(info["completed_tasks"])
            agent_productivity[agent_name] = {
                "completed_tasks": completed_count,
                "current_status": info["status"],
                "current_task": info["current_task"]
            }
        
        # Add to report
        report["task_statuses"] = task_statuses
        report["agent_productivity"] = agent_productivity
        
        # Add timeline information
        report["timeline"] = self.timeline
        
        return report
