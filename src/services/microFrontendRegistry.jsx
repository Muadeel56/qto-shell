import React from 'react';
import { Calendar, Users, BarChart3, Handshake, Briefcase, ChevronDown, ChevronRight } from 'lucide-react';

// Micro-frontend registry and loader service
export const microFrontendRegistry = {
  hrm: {
    name: 'HR Management',
    icon: () => <Users size={20} />,
    description: 'Human Resource Management System',
    isActive: true,
    isParent: true,
    permissions: ['hrm.view'],
    children: {
      attendance: {
        name: 'Attendance Portal',
        icon: () => <Calendar size={18} />,
        url: 'https://portal.qto.company',
        productionUrl: 'https://portal.qto.company',
        description: 'Employee attendance tracking and management',
        isActive: true,
        permissions: ['attendance.view', 'attendance.manage']
      },
      career: {
        name: 'Career Portal',
        icon: () => <Briefcase size={18} />,
        url: 'https://dev.qtohouse.com.pk',
        productionUrl: 'https://dev.qtohouse.com.pk',
        description: 'Job postings and career management',
        isActive: true,
        permissions: ['career.view', 'career.manage']
      }
    }
  },
  'project-management': {
    name: 'Project Management',
    icon: () => <BarChart3 size={20} />,
    url: 'https://qtohouse.com',
    productionUrl: 'https://qtohouse.com',
    description: 'Project tracking and task management',
    isActive: true,
    permissions: ['projects.view', 'projects.manage']
  },
  crm: {
    name: 'Customer Relationship Management',
    icon: () => <Handshake size={20} />,
    url: 'http://localhost:3004',
    productionUrl: 'https://crm.qto.com',
    description: 'Customer management and sales tracking',
    isActive: true,
    permissions: ['crm.view', 'crm.manage']
  }
};

// Get micro-frontend configuration
export const getMicroFrontend = (id) => {
  // Check if it's a parent item
  if (microFrontendRegistry[id]) {
    return microFrontendRegistry[id];
  }
  
  // Check if it's a child item
  for (const [parentId, parentConfig] of Object.entries(microFrontendRegistry)) {
    if (parentConfig.children && parentConfig.children[id]) {
      return parentConfig.children[id];
    }
  }
  
  return null;
};

// Get child micro-frontend configuration
export const getChildMicroFrontend = (parentId, childId) => {
  const parent = microFrontendRegistry[parentId];
  if (parent && parent.children && parent.children[childId]) {
    return parent.children[childId];
  }
  return null;
};

// Get all active micro-frontends (flat structure for compatibility)
export const getActiveMicroFrontends = () => {
  return Object.entries(microFrontendRegistry)
    .filter(([, config]) => config.isActive)
    .map(([id, config]) => ({ id, ...config }));
};

// Get hierarchical structure for sidebar
export const getHierarchicalMicroFrontends = () => {
  return Object.entries(microFrontendRegistry)
    .filter(([, config]) => config.isActive)
    .map(([id, config]) => {
      const item = { id, ...config };
      if (config.children) {
        item.children = Object.entries(config.children)
          .filter(([, childConfig]) => childConfig.isActive)
          .map(([childId, childConfig]) => ({ id: childId, parentId: id, ...childConfig }));
      }
      return item;
    });
};

// Load micro-frontend
export const loadMicroFrontend = (id, parentId = null) => {
  let config;
  
  if (parentId) {
    config = getChildMicroFrontend(parentId, id);
  } else {
    config = getMicroFrontend(id);
  }
  
  if (!config) {
    throw new Error(`Micro-frontend '${id}' not found`);
  }
  
  // Parent items without URL are just containers
  if (config.isParent && !config.url) {
    return {
      ...config,
      isContainer: true
    };
  }
  
  const isDevelopment = import.meta.env.DEV;
  const url = isDevelopment ? config.url : config.productionUrl;
  
  return {
    ...config,
    url,
    loadUrl: `${url}/static/js/main.js` // Adjust based on your build setup
  };
};

// Check if user has permission to access micro-frontend
export const hasPermission = (microFrontendId, userPermissions = []) => {
  const config = getMicroFrontend(microFrontendId);
  if (!config) return false;
  
  return config.permissions.some(permission => 
    userPermissions.includes(permission)
  );
};
