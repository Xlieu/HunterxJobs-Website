# Programmer Agent
# This file implements the Programmer agent that builds the website and develops required functions

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import os
import json

# Import base agent class
from ..base.base_agent import BaseAgent

class ProgrammerAgent(BaseAgent):
    """
    Programmer Agent that builds the website and develops required functions.
    Responsible for implementing frontend and backend components based on project requirements.
    """
    
    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None):
        """
        Initialize the Programmer agent.
        
        Args:
            name: Name of the agent
            config: Optional configuration dictionary
        """
        super().__init__(name=name, agent_type="programmer")
        
        # Initialize programmer-specific attributes
        self.current_project = "HunterXJobs"
        self.tech_stack = {
            "frontend": ["Next.js", "React", "TypeScript"],
            "backend": ["Python", "FastAPI", "PostgreSQL", "Redis"],
            "ai": ["PyTorch", "LLaMA 3"]
        }
        self.code_repositories = {}
        self.current_feature = None
        self.implemented_features = []
        self.code_templates = {}
        
        # Load configuration if provided
        if config:
            self._load_config(config)
        
        self.logger.info(f"Programmer Agent {name} initialized for project {self.current_project}")
    
    def _load_config(self, config: Dict[str, Any]) -> None:
        """
        Load configuration settings.
        
        Args:
            config: Configuration dictionary
        """
        if "tech_stack" in config:
            self.tech_stack = config["tech_stack"]
        
        if "code_templates" in config:
            self.code_templates = config["code_templates"]
    
    def create_project_structure(self, base_dir: str) -> Dict[str, Any]:
        """
        Create the basic project structure for the website.
        
        Args:
            base_dir: Base directory for the project
            
        Returns:
            Dictionary containing the created structure
        """
        structure = {
            "frontend": {
                "pages": ["index.js", "api", "auth", "dashboard", "profile"],
                "components": ["layout", "common", "auth", "dashboard", "profile"],
                "styles": ["globals.css", "theme.js"],
                "public": ["images", "fonts"]
            },
            "backend": {
                "api": ["auth", "linkedin", "profile", "content"],
                "models": ["user", "profile", "content"],
                "services": ["linkedin_service", "ai_service", "security_service"],
                "utils": ["helpers", "validators"]
            }
        }
        
        # Create directories and placeholder files
        for section, contents in structure.items():
            section_dir = os.path.join(base_dir, section)
            os.makedirs(section_dir, exist_ok=True)
            
            for item in contents:
                if isinstance(item, str):
                    # Create empty file
                    with open(os.path.join(section_dir, item), 'w') as f:
                        f.write(f"# {item} - Created by Programmer Agent\n")
                else:
                    # Create subdirectory
                    os.makedirs(os.path.join(section_dir, item), exist_ok=True)
        
        self.logger.info(f"Created project structure in {base_dir}")
        return structure
    
    def implement_feature(self, feature_name: str, feature_spec: Dict[str, Any]) -> Dict[str, Any]:
        """
        Implement a specific feature based on its specification.
        
        Args:
            feature_name: Name of the feature
            feature_spec: Specification of the feature
            
        Returns:
            Dictionary containing implementation details
        """
        self.logger.info(f"Implementing feature: {feature_name}")
        self.current_feature = feature_name
        
        # Track files created or modified
        files_created = []
        files_modified = []
        
        # Determine feature type and implement accordingly
        feature_type = feature_spec.get("type", "unknown")
        
        if feature_type == "frontend":
            # Implement frontend feature
            component_files = self._implement_frontend_feature(feature_name, feature_spec)
            files_created.extend(component_files)
            
        elif feature_type == "backend":
            # Implement backend feature
            api_files = self._implement_backend_feature(feature_name, feature_spec)
            files_created.extend(api_files)
            
        elif feature_type == "integration":
            # Implement integration feature (both frontend and backend)
            frontend_files = self._implement_frontend_feature(feature_name, feature_spec)
            backend_files = self._implement_backend_feature(feature_name, feature_spec)
            files_created.extend(frontend_files)
            files_created.extend(backend_files)
            
            # Create integration code
            integration_files = self._implement_integration(feature_name, feature_spec)
            files_created.extend(integration_files)
        
        # Add to implemented features
        implementation_details = {
            "feature_name": feature_name,
            "feature_type": feature_type,
            "files_created": files_created,
            "files_modified": files_modified,
            "implemented_at": datetime.now().isoformat()
        }
        
        self.implemented_features.append(implementation_details)
        self.current_feature = None
        
        return implementation_details
    
    def _implement_frontend_feature(self, feature_name: str, feature_spec: Dict[str, Any]) -> List[str]:
        """
        Implement a frontend feature.
        
        Args:
            feature_name: Name of the feature
            feature_spec: Specification of the feature
            
        Returns:
            List of created files
        """
        files_created = []
        
        # Create React components
        components = feature_spec.get("components", [])
        for component in components:
            component_name = component.get("name")
            component_path = component.get("path", f"components/{feature_name.lower()}")
            component_code = self._generate_react_component(component_name, component.get("props", []))
            
            # Create the file
            os.makedirs(component_path, exist_ok=True)
            file_path = f"{component_path}/{component_name}.jsx"
            with open(file_path, 'w') as f:
                f.write(component_code)
            
            files_created.append(file_path)
        
        # Create pages
        pages = feature_spec.get("pages", [])
        for page in pages:
            page_name = page.get("name")
            page_path = page.get("path", "pages")
            page_code = self._generate_next_page(page_name, page.get("components", []))
            
            # Create the file
            os.makedirs(page_path, exist_ok=True)
            file_path = f"{page_path}/{page_name}.jsx"
            with open(file_path, 'w') as f:
                f.write(page_code)
            
            files_created.append(file_path)
        
        return files_created
    
    def _implement_backend_feature(self, feature_name: str, feature_spec: Dict[str, Any]) -> List[str]:
        """
        Implement a backend feature.
        
        Args:
            feature_name: Name of the feature
            feature_spec: Specification of the feature
            
        Returns:
            List of created files
        """
        files_created = []
        
        # Create API endpoints
        endpoints = feature_spec.get("endpoints", [])
        for endpoint in endpoints:
            endpoint_name = endpoint.get("name")
            endpoint_path = endpoint.get("path", f"api/{feature_name.lower()}")
            endpoint_code = self._generate_api_endpoint(endpoint_name, endpoint)
            
            # Create the file
            os.makedirs(endpoint_path, exist_ok=True)
            file_path = f"{endpoint_path}/{endpoint_name}.py"
            with open(file_path, 'w') as f:
                f.write(endpoint_code)
            
            files_created.append(file_path)
        
        # Create models
        models = feature_spec.get("models", [])
        for model in models:
            model_name = model.get("name")
            model_path = model.get("path", "models")
            model_code = self._generate_model(model_name, model.get("fields", []))
            
            # Create the file
            os.makedirs(model_path, exist_ok=True)
            file_path = f"{model_path}/{model_name}.py"
            with open(file_path, 'w') as f:
                f.write(model_code)
            
            files_created.append(file_path)
        
        # Create services
        services = feature_spec.get("services", [])
        for service in services:
            service_name = service.get("name")
            service_path = service.get("path", "services")
            service_code = self._generate_service(service_name, service)
            
            # Create the file
            os.makedirs(service_path, exist_ok=True)
            file_path = f"{service_path}/{service_name}.py"
            with open(file_path, 'w') as f:
                f.write(service_code)
            
            files_created.append(file_path)
        
        return files_created
    
    def _implement_integration(self, feature_name: str, feature_spec: Dict[str, Any]) -> List[str]:
        """
        Implement integration between frontend and backend.
        
        Args:
            feature_name: Name of the feature
            feature_spec: Specification of the feature
            
        Returns:
            List of created files
        """
        files_created = []
        
        # Create API client for frontend
        api_client_path = "frontend/utils/api"
        os.makedirs(api_client_path, exist_ok=True)
        
        api_client_code = self._generate_api_client(feature_name, feature_spec)
        file_path = f"{api_client_path}/{feature_name.lower()}_api.js"
        with open(file_path, 'w') as f:
            f.write(api_client_code)
        
        files_created.append(file_path)
        
        return files_created
    
    def _generate_react_component(self, component_name: str, props: List[Dict[str, Any]]) -> str:
        """
        Generate code for a React component.
        
        Args:
            component_name: Name of the component
            props: List of props for the component
            
        Returns:
            Generated component code
        """
        props_list = ", ".join([prop.get("name") for prop in props])
        props_destructure = "{ " + props_list + " }" if props else "props"
        
        props_types = []
        for prop in props:
            prop_name = prop.get("name")
            prop_type = prop.get("type", "any")
            props_types.append(f"  {prop_name}: {prop_type};")
        
        props_interface = "\n".join(props_types)
        
        return f"""import React from 'react';
import styles from './{component_name}.module.css';

interface {component_name}Props {{
{props_interface}
}}

const {component_name}: React.FC<{component_name}Props> = ({props_destructure}) => {{
  return (
    <div className={{styles.container}}>
      <h2>{component_name} Component</h2>
      {/* Component content goes here */}
    </div>
  );
}};

export default {component_name};
"""
    
    def _generate_next_page(self, page_name: str, components: List[str]) -> str:
        """
        Generate code for a Next.js page.
        
        Args:
            page_name: Name of the page
            components: List of components used in the page
            
        Returns:
            Generated page code
        """
        imports = []
        component_instances = []
        
        for component in components:
            imports.append(f"import {component} from '../components/{component}';")
            component_instances.append(f"      <{component} />")
        
        imports_code = "\n".join(imports)
        components_code = "\n".join(component_instances)
        
        return f"""import React from 'react';
import Head from 'next/head';
{imports_code}
import styles from '../styles/{page_name}.module.css';

const {page_name}Page: React.FC = () => {{
  return (
    <div className={{styles.container}}>
      <Head>
        <title>{page_name} | HunterXJobs</title>
        <meta name="description" content="HunterXJobs - AI-Powered Career Catalyst" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={{styles.main}}>
        <h1 className={{styles.title}}>{page_name}</h1>
{components_code}
      </main>
    </div>
  );
}};

export default {page_name}Page;
"""
    
    def _generate_api_endpoint(self, endpoint_name: str, endpoint_spec: Dict[str, Any]) -> str:
        """
        Generate code for an API endpoint.
        
        Args:
            endpoint_name: Name of the endpoint
            endpoint_spec: Specification of the endpoint
            
        Returns:
            Generated endpoint code
        """
        method = endpoint_spec.get("method", "GET")
        path = endpoint_spec.get("path", f"/{endpoint_name.lower()}")
        
        return f"""from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class {endpoint_name}Request(BaseModel):
    # Request model fields
    pass

class {endpoint_name}Response(BaseModel):
    # Response model fields
    success: bool
    message: str
    data: Optional[dict] = None

@router.{method.lower()}("{path}")
async def {endpoint_name.lower()}(request: {endpoint_name}Request):
    \"\"\"
    {endpoint_spec.get("description", f"{endpoint_name} endpoint")}
    \"\"\"
    try:
        # Endpoint implementation
        result = {{"key": "value"}}
        
        return {endpoint_name}Response(
            success=True,
            message="Operation successful",
            data=result
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
"""
    
    def _generate_model(self, model_name: str, fields: List[Dict[str, Any]]) -> str:
        """
        Generate code for a database model.
        
        Args:
            model_name: Name of the model
            fields: List of fields for the model
            
        Returns:
            Generated model code
        """
        field_definitions = []
        
        for field in fields:
            field_name = field.get("name")
            field_type = field.get("type", "String")
            field_options = field.get("options", {})
            
            options_str = ", ".join([f"{k}={v}" for k, v in field_options.items()])
            field_definitions.append(f"    {field_name} = Column({field_type}, {options_str})")
        
        fields_code = "\n".join(field_definitions)
        
        return f"""from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base

class {model_name}(Base):
    \"\"\"
    {model_name} model
    \"\"\"
    __tablename__ = "{model_name.lower()}s"
    
    id = Column(Integer, primary_key=True, index=True)
{fields_code}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>