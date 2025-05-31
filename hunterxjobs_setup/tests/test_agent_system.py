#!/usr/bin/env python3
# Test script for the HunterXJobs agent system

import os
import sys
import logging
import unittest
import json
from datetime import datetime

# Add parent directory to path to import agents
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agents.agent_system import AgentSystem
from agents.project_manager import ProjectManagerAgent
from agents.programmer import ProgrammerAgent
from agents.debugger import DebuggerAgent
from agents.linkedin_optimizer import LinkedInProfileOptimizerAgent
from agents.security import SecurityAgent

class TestAgentSystem(unittest.TestCase):
    """Test cases for the HunterXJobs agent system"""
    
    def setUp(self):
        """Set up test environment"""
        # Configure logging
        logging.basicConfig(level=logging.ERROR)  # Set to ERROR to reduce test output
        
        # Initialize agent system with test configuration
        self.agent_system = AgentSystem()
    
    def tearDown(self):
        """Clean up after tests"""
        if hasattr(self, 'agent_system'):
            self.agent_system.stop()
    
    def test_agent_initialization(self):
        """Test that all agents are properly initialized"""
        agents = self.agent_system.get_all_agents()
        
        # Check that all expected agents exist
        self.assertIn("project_manager", agents)
        self.assertIn("programmer", agents)
        self.assertIn("debugger", agents)
        self.assertIn("linkedin_optimizer", agents)
        self.assertIn("security", agents)
        
        # Check agent types
        self.assertEqual(agents["project_manager"].agent_type, "project_manager")
        self.assertEqual(agents["programmer"].agent_type, "programmer")
        self.assertEqual(agents["debugger"].agent_type, "debugger")
        self.assertEqual(agents["linkedin_optimizer"].agent_type, "linkedin_optimizer")
        self.assertEqual(agents["security"].agent_type, "security")
    
    def test_message_passing(self):
        """Test message passing between agents"""
        # Create a test message
        test_message = {
            "id": f"test_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "sender": "project_manager",
            "receiver": "programmer",
            "message_type": "request",
            "content": {
                "action": "test_action",
                "data": {
                    "test_key": "test_value"
                }
            },
            "timestamp": datetime.now().isoformat()
        }
        
        # Send message
        result = self.agent_system.send_message(test_message)
        self.assertTrue(result)
    
    def test_system_status(self):
        """Test getting system status"""
        status = self.agent_system.get_system_status()
        
        # Check status structure
        self.assertIn("system_status", status)
        self.assertIn("agent_statuses", status)
        self.assertIn("message_queue_size", status)
        self.assertIn("generated_at", status)
        
        # Check that all agents are in the status
        agent_statuses = status["agent_statuses"]
        self.assertIn("project_manager", agent_statuses)
        self.assertIn("programmer", agent_statuses)
        self.assertIn("debugger", agent_statuses)
        self.assertIn("linkedin_optimizer", agent_statuses)
        self.assertIn("security", agent_statuses)


class TestProjectManagerAgent(unittest.TestCase):
    """Test cases for the Project Manager Agent"""
    
    def setUp(self):
        """Set up test environment"""
        self.agent = ProjectManagerAgent(name="TestProjectManager")
    
    def test_initialization(self):
        """Test agent initialization"""
        self.assertEqual(self.agent.name, "TestProjectManager")
        self.assertEqual(self.agent.agent_type, "project_manager")
    
    def test_message_handling(self):
        """Test message handling"""
        # Create a test message
        test_message = {
            "id": f"test_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "sender": "system",
            "receiver": "project_manager",
            "message_type": "request",
            "content": {
                "action": "get_project_status",
                "data": {}
            },
            "timestamp": datetime.now().isoformat()
        }
        
        # Send message to agent
        response = self.agent.receive_message(test_message)
        
        # Check response
        self.assertIsNotNone(response)
        self.assertEqual(response["receiver"], "system")
        self.assertEqual(response["message_type"], "response")


class TestProgrammerAgent(unittest.TestCase):
    """Test cases for the Programmer Agent"""
    
    def setUp(self):
        """Set up test environment"""
        self.agent = ProgrammerAgent(name="TestProgrammer")
    
    def test_initialization(self):
        """Test agent initialization"""
        self.assertEqual(self.agent.name, "TestProgrammer")
        self.assertEqual(self.agent.agent_type, "programmer")
    
    def test_message_handling(self):
        """Test message handling"""
        # Create a test message
        test_message = {
            "id": f"test_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "sender": "project_manager",
            "receiver": "programmer",
            "message_type": "request",
            "content": {
                "action": "get_development_status",
                "data": {}
            },
            "timestamp": datetime.now().isoformat()
        }
        
        # Send message to agent
        response = self.agent.receive_message(test_message)
        
        # Check response
        self.assertIsNotNone(response)
        self.assertEqual(response["receiver"], "project_manager")
        self.assertEqual(response["message_type"], "response")


class TestDebuggerAgent(unittest.TestCase):
    """Test cases for the Debugger Agent"""
    
    def setUp(self):
        """Set up test environment"""
        self.agent = DebuggerAgent(name="TestDebugger")
    
    def test_initialization(self):
        """Test agent initialization"""
        self.assertEqual(self.agent.name, "TestDebugger")
        self.assertEqual(self.agent.agent_type, "debugger")


class TestLinkedInProfileOptimizerAgent(unittest.TestCase):
    """Test cases for the LinkedIn Profile Optimizer Agent"""
    
    def setUp(self):
        """Set up test environment"""
        self.agent = LinkedInProfileOptimizerAgent(name="TestLinkedInOptimizer")
    
    def test_initialization(self):
        """Test agent initialization"""
        self.assertEqual(self.agent.name, "TestLinkedInOptimizer")
        self.assertEqual(self.agent.agent_type, "linkedin_optimizer")


class TestSecurityAgent(unittest.TestCase):
    """Test cases for the Security Agent"""
    
    def setUp(self):
        """Set up test environment"""
        self.agent = SecurityAgent(name="TestSecurity")
    
    def test_initialization(self):
        """Test agent initialization"""
        self.assertEqual(self.agent.name, "TestSecurity")
        self.assertEqual(self.agent.agent_type, "security")
    
    def test_security_status(self):
        """Test getting security status"""
        status = self.agent.get_security_status()
        
        # Check status structure
        self.assertIn("status", status)
        self.assertIn("security_score", status)
        self.assertIn("monitoring_status", status)


if __name__ == "__main__":
    unittest.main()
